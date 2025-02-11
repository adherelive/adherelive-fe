// Frontend React Component (src/components/PdfGenerator.jsx)
import React, { useState } from 'react';
import axios from 'axios';

const PdfGenerator = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [language, setLanguage] = useState('');

    const handleGeneratePDF = async () => {
        try {
            setIsGenerating(true);

            // First, prompt user for language selection
            const response = await axios.post('/api/generate-pdf', {
                language: language,
            }, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            // Create a blob from the PDF data and download it
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `document_${language}.pdf`;
            link.click();

        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
            setProgress(0);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={() => {
                    const userLanguage = window.confirm('Would you like the document in Hindi/Devanagari? Click OK for Hindi, Cancel for English')
                        ? 'hi'
                        : 'en';
                    setLanguage(userLanguage);
                    handleGeneratePDF();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isGenerating}
            >
                Generate PDF
            </button>

            {isGenerating && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded">
                        <div
                            className="bg-blue-500 text-white text-center p-1 rounded"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfGenerator;