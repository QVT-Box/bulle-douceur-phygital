import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get OpenAI API Key
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing mood for user:', userId);

    // Fetch user's mood entries from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: moodEntries, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching mood entries:', error);
      throw error;
    }

    console.log(`Found ${moodEntries?.length || 0} mood entries`);

    if (!moodEntries || moodEntries.length === 0) {
      return new Response(JSON.stringify({
        message: "Commencez par partager vos humeurs pour recevoir des insights personnalisés 🌱",
        recommendations: ["Prenez quelques minutes pour remplir votre première bulle d'humeur"]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare data for AI analysis
    const moodData = moodEntries.map(entry => ({
      date: entry.date,
      energy: entry.energy_level,
      stress: entry.stress_level,
      motivation: entry.motivation,
      social: entry.social_connection,
      satisfaction: entry.work_satisfaction,
      comment: entry.comment
    }));

    // Create AI prompt for analysis
    const prompt = `
Tu es un coach en bien-être bienveillant et poétique. Analyse ces données d'humeur d'une personne sur les 30 derniers jours et génère une réponse personnalisée, chaleureuse et inspirante.

Données d'humeur (échelle 1-5):
${JSON.stringify(moodData, null, 2)}

Génère une réponse JSON avec:
1. "trend_analysis": analyse des tendances (positives et négatives)
2. "personalized_message": message bienveillant et poétique (150-200 mots)
3. "recommendations": array de 3-4 recommandations concrètes et adaptées
4. "confidence": score de confiance (0.0-1.0)

Style: Chaleureux, bienveillant, poétique, sans jargon médical. Utilise des métaphores de la nature et des bulles.
Évite les conseils génériques - base-toi sur les données réelles.
`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tu es un assistant IA spécialisé en bien-être, répondant uniquement en JSON valide.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    console.log('AI analysis generated:', analysis);

    // Store the analysis in the database
    const { error: insertError } = await supabase
      .from('mood_analytics')
      .insert({
        user_id: userId,
        trend_analysis: analysis.trend_analysis,
        personalized_message: analysis.personalized_message,
        recommendations: analysis.recommendations,
        ai_confidence: analysis.confidence,
      });

    if (insertError) {
      console.error('Error storing analysis:', insertError);
      throw insertError;
    }

    console.log('Analysis stored successfully');

    return new Response(JSON.stringify({
      success: true,
      analysis: {
        message: analysis.personalized_message,
        recommendations: analysis.recommendations,
        confidence: analysis.confidence
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mood-ai-analysis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});