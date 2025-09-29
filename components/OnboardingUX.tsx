/**
 * Onboarding & UX Enhancement Components for HOTMESS business suite
 * Animated onboarding modals, progressive user tutorials, and interactive help system
 */

'use client';

import { useState, useEffect } from 'react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component?: React.ReactNode;
  background?: string;
  icon?: string;
  cta?: {
    primary: string;
    secondary?: string;
  };
}

interface OnboardingFlowProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
  isOpen: boolean;
}

export function OnboardingFlow({ steps, onComplete, onSkip, isOpen }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  const step = steps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip
              </button>
            )}
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-hotpink h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="relative h-96">
            <div className="absolute inset-0 flex flex-col">
              {/* Background */}
              {step.background && (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: step.background,
                  }}
                />
              )}

              {/* Icon */}
              {step.icon && (
                <div className="flex justify-center pt-8 pb-4">
                  <div className="text-6xl">{step.icon}</div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 px-8 py-6 flex flex-col justify-center">
                <h2 className="text-2xl font-heading font-bold text-hotpink mb-4 text-center">
                  {step.title}
                </h2>
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Custom Component */}
                {step.component && (
                  <div className="mb-6">
                    {step.component}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-8 py-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToStep(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentStep ? 'bg-hotpink' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-hotpink hover:bg-hotpink/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    {currentStep === steps.length - 1 
                      ? (step.cta?.primary || 'Get Started') 
                      : 'Next'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Help System
interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  content: React.ReactNode;
  searchTerms: string[];
}

interface HelpSystemProps {
  topics: HelpTopic[];
  isOpen: boolean;
  onClose: () => void;
}

export function HelpSystem({ topics, isOpen, onClose }: HelpSystemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(topics.map(topic => topic.category)))];
  
  const filteredTopics = topics.filter(topic => {
    const matchesSearch = !searchTerm || 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.searchTerms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-hotpink">Help Center</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-hotpink text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto">
            {filteredTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full p-4 text-left border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                  selectedTopic?.id === topic.id ? 'bg-gray-800' : ''
                }`}
              >
                <h3 className="font-semibold text-white mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{topic.description}</p>
                <span className="text-xs text-hotpink mt-2 inline-block">{topic.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-black overflow-y-auto">
          {selectedTopic ? (
            <div className="p-8">
              <h1 className="text-3xl font-heading font-bold text-hotpink mb-4">
                {selectedTopic.title}
              </h1>
              <p className="text-gray-400 mb-8">{selectedTopic.description}</p>
              <div className="prose prose-invert max-w-none">
                {selectedTopic.content}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">❓</div>
                <h2 className="text-xl font-heading font-bold text-white mb-2">
                  Need Help?
                </h2>
                <p className="text-gray-400">
                  Select a topic from the sidebar to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Progress Indicator Component
interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical' | 'circular';
}

export function ProgressIndicator({ steps, currentStep, variant = 'horizontal' }: ProgressIndicatorProps) {
  if (variant === 'circular') {
    const progress = ((currentStep + 1) / steps.length) * 100;
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-700"
          />
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-hotpink transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{currentStep + 1}</span>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep
                ? 'bg-hotpink border-hotpink text-white'
                : 'border-gray-600 text-gray-400'
            }`}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={`font-medium ${
              index <= currentStep ? 'text-white' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            index <= currentStep
              ? 'bg-hotpink border-hotpink text-white'
              : 'border-gray-600 text-gray-400'
          }`}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 ${
              index < currentStep ? 'bg-hotpink' : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Quick Actions Component
interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  isVisible: boolean;
}

export function QuickActions({ actions, isVisible }: QuickActionsProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-80">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-heading font-bold text-hotpink">Quick Actions</h3>
        </div>
        <div className="p-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.color || 'bg-hotpink'
              }`}>
                {action.icon}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-white">{action.title}</h4>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}