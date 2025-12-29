// E-Agent
import eagent1 from "@/assets/e-agent/1.jpg";
import eagent2 from "@/assets/e-agent/2.jpg";
import eagent3 from "@/assets/e-agent/3.jpg";

// Fabrico
import fabrico1 from "@/assets/fabrico/1.jpg";
import fabrico2 from "@/assets/fabrico/2.jpg";
import fabrico3 from "@/assets/fabrico/3.jpg";
import fabrico4 from "@/assets/fabrico/4.jpg";

// Kurochki Telegram Bot
import kurochki1 from "@/assets/kurochki_telegram_bot/1.jpg";
import kurochki2 from "@/assets/kurochki_telegram_bot/2.jpg";
import kurochki3 from "@/assets/kurochki_telegram_bot/3.jpg";
import kurochki4 from "@/assets/kurochki_telegram_bot/4.jpg";

// Prihlaseni
import prihlaseni1 from "@/assets/prihlaseni/1.jpg";
import prihlaseni2 from "@/assets/prihlaseni/2.jpg";
import prihlaseni3 from "@/assets/prihlaseni/3.jpg";
import prihlaseni4 from "@/assets/prihlaseni/4.jpg";

export const projectImages: Record<string, string[]> = {
    'e-agent': [eagent1, eagent2, eagent3],
    'fabrico': [fabrico1, fabrico2, fabrico3, fabrico4],
    'kurochki_telegram_bot': [kurochki1, kurochki2, kurochki3, kurochki4],
    'prihlaseni': [prihlaseni1, prihlaseni2, prihlaseni3, prihlaseni4]
};

export const getProjectImages = (id: string): string[] => {
    return projectImages[id] || [];
};

export const getFirstProjectImage = (id: string): string => {
    const images = projectImages[id];
    return images && images.length > 0 ? images[0] : "";
};
