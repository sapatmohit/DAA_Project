'use client';

import React from 'react';

interface LanguageSelectorProps {
	selectedLanguage: 'c' | 'cpp' | 'java';
	onLanguageChange: (language: 'c' | 'cpp' | 'java') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	selectedLanguage,
	onLanguageChange,
}) => {
	const languages = [
		{ value: 'c', label: 'C', icon: '🔧' },
		{ value: 'cpp', label: 'C++', icon: '⚡' },
		{ value: 'java', label: 'Java', icon: '☕' },
	] as const;

	return (
		<div className="flex items-center gap-1">
			<label className="text-xs font-medium text-gray-300">Lang:</label>
			<select
				value={selectedLanguage}
				onChange={(e) =>
					onLanguageChange(e.target.value as 'c' | 'cpp' | 'java')
				}
				className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
			>
				{languages.map((lang) => (
					<option
						key={lang.value}
						value={lang.value}
						className="bg-gray-700 text-white"
					>
						{lang.icon} {lang.label}
					</option>
				))}
			</select>
		</div>
	);
};
