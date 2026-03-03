import { createContext, useContext, useState, ReactNode } from 'react';

export interface CalculatorData {
    serviceType: string;
    projectGoal: string;
    scale: string;
    budget: string;
    timeline: string;
}

interface CalculatorContextType {
    calculatorData: CalculatorData | null;
    setCalculatorData: (data: CalculatorData | null) => void;
    isCalculatorComplete: boolean;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
    const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null);

    const isCalculatorComplete = calculatorData !== null &&
        calculatorData.serviceType !== '' &&
        calculatorData.projectGoal !== '' &&
        calculatorData.scale !== '' &&
        calculatorData.budget !== '' &&
        calculatorData.timeline !== '';

    return (
        <CalculatorContext.Provider
            value={{
                calculatorData,
                setCalculatorData,
                isCalculatorComplete,
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

export const useCalculator = () => {
    const context = useContext(CalculatorContext);
    if (context === undefined) {
        throw new Error('useCalculator must be used within a CalculatorProvider');
    }
    return context;
};
