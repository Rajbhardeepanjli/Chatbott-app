export type Role = "user" | "assistant";

export interface UiMessage {
  role: Role;
  content: string;
  timestamp?: string; 
}

export const SentimentValues = ["positive", "neutral", "negative"] as const;
export type Sentiment = typeof SentimentValues[number];

export interface ParsedAI {
  reply: string;              
  sentiment: Sentiment;       
  keywords: string[];        
  actions?: { type: string; value?: string }[]; 
}
