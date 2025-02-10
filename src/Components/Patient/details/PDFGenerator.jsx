// PDFGenerator.jsx
import React from 'react';
// Note: We'll use a different UI library since @mui/material requires React 17+
import Modal from 'react-modal';

class PDFGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            previewHtml: null,
            jobId: null,
            progress: 0,
            generating: false
        };

        // In Docker, this would be your Node.js service URL
        this.apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost/api:3000';
    }

    componentDidMount() {
        // Initialize polling if needed
        this.setupProgressPolling();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Handle polling setup/cleanup when jobId changes
        if (this.state.jobId !== prevState.jobId) {
            this.setupProgressPolling();
        }
    }

    componentWillUnmount() {
        // Clean up polling interval
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }
    }

    setupProgressPolling = () => {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }

        if (this.state.jobId && this.state.generating) {
            this.pollInterval = setInterval(this.checkJobStatus, 1000);
        }
    }

    checkJobStatus = async () => {
        try {
            const response = await fetch(
                `${this.apiBaseUrl}/api/pdf-status/${this.state.jobId}`,
                {
                    credentials: 'include',  // Important for cross-origin requests
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            const { progress, completed, pdfUrl } = await response.json();

            this.setState({ progress });

            if (completed) {
                this.setState({ generating: false });
                clearInterval(this.pollInterval);

                if (pdfUrl) {
                    // Handle PDF download through API service
                    window.location.href = `${this.apiBaseUrl}${pdfUrl}`;
                }
            }
        } catch (error) {
            console.error('Error checking job status:', error);
        }
    }

    generatePreview = async (language) => {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/preview-pdf`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    templateName: this.props.templateName,
                    data: this.props.data,
                    language
                })
            });

            if (!response.ok) throw new Error('Preview generation failed');

            const html = await response.text();
            this.setState({ previewHtml: html });
        } catch (error) {
            console.error('Error generating preview:', error);
        }
    }

    render() {
        const { isDialogOpen, previewHtml, generating, progress } = this.state;

        return (
            <div>
                <button onClick={() => this.setState({ isDialogOpen: true })}>
                    Generate PDF
                </button>

                <Modal
                    isOpen={isDialogOpen}
                    onRequestClose={() => this.setState({ isDialogOpen: false })}
                    contentLabel="PDF Generation Dialog"
                >
                    <div className="modal-content">
                        {previewHtml ? (
                            <div className="preview-container">
                                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                            </div>
                        ) : (
                            <p>Select a language to preview the PDF:</p>
                        )}

                        {generating && (
                            <div className="progress-container">
                                <progress value={progress} max="100" />
                                <p>Generating PDF: {progress}%</p>
                            </div>
                        )}

                        <div className="button-container">
                            {!previewHtml ? (
                                <>
                                    <button onClick={() => this.generatePreview('en')}>
                                        Preview in English
                                    </button>
                                    <button onClick={() => this.generatePreview('hi')}>
                                        Preview in Hindi
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => this.startPDFGeneration(previewHtml.language)}
                                        disabled={generating}
                                    >
                                        Generate PDF
                                    </button>
                                    <button onClick={() => this.setState({ previewHtml: null })}>
                                        Back to Language Selection
                                    </button>
                                </>
                            )}
                            <button onClick={() => this.setState({ isDialogOpen: false })}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default PDFGenerator;