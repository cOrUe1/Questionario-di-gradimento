export type QuestionType = "stars" | "circles" | "textarea" | "options";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  min?: number;
  max?: number;
  options?: string[];
  includeNoNeed?: boolean; // For question 9
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "Con che probabilità consiglieresti il nostro negozio a un amico o familiare?",
    type: "circles",
    min: 0,
    max: 10,
  },
  {
    id: "q2",
    text: "Quanto è stato semplice scegliere e completare l’ordine?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q3",
    text: "Come valuti la qualità dei mobili consegnati?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q4",
    text: "Il nostro personale ti è sembrato professionale e gentile?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q5",
    text: "Il montaggio è stato eseguito con cura e precisione?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q6",
    text: "La consegna è avvenuta nei tempi previsti?",
    type: "options",
    options: ["✔ Sì", "⚠️ Piccolo ritardo", "❌ Ritardo significativo"],
  },
  {
    id: "q7",
    text: "Il risultato finale ha soddisfatto le tue aspettative estetiche?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q8",
    text: "Come valuti il rapporto qualità/prezzo?",
    type: "stars",
    min: 1,
    max: 5,
  },
  {
    id: "q9",
    text: "Se hai avuto bisogno di assistenza post-vendita, quanto è stata efficace?",
    type: "stars",
    min: 1,
    max: 5,
    includeNoNeed: true,
  },
  {
    id: "q11",
    text: "Ti rivolgeresti nuovamente a noi per arredare altri ambienti della tua casa?",
    type: "options",
    options: ["✅✅ Sicuramente", "✅ Probabilmente", "🤔 Forse", "❌ No"],
  },
  {
    id: "q10",
    text: "Cosa potremmo migliorare, secondo te?",
    type: "textarea",
  },
];