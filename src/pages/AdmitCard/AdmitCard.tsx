import React, { useState, useRef } from 'react';
import { FileText, ChevronDown, Upload, Signature, Image, X } from 'lucide-react';

// --- 1. Signature Modal Component ---
interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signatureData: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onSave }) => {
    const [signatureFile, setSignatureFile] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Function to handle file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                window.alert("Please upload a valid image file (PNG, JPG, JPEG).");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                // Save the data URL to state for preview
                setSignatureFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (signatureFile) {
            onSave(signatureFile);
            onClose();
        } else {
            window.alert("Please upload a signature image first."); 
        }
    };

    if (!isOpen) return null;

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <Signature className="w-5 h-5 mr-2 text-red-500" /> Upload Authorized Signature
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X /></button>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Please upload your digital signature image (.png, .jpg).</p>
                    
                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Upload/Preview Area */}
                    <div 
                        className="h-32 w-full border border-gray-400 border-dashed rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 cursor-pointer p-2 overflow-hidden"
                        onClick={() => fileInputRef.current?.click()} // Click triggers the file input
                        title="Click to Upload Signature Image"
                    >
                        {signatureFile ? (
                            // Display the uploaded signature image
                            <img 
                                src={signatureFile} 
                                alt="Uploaded Signature" 
                                className="h-full w-auto object-contain" 
                            />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Upload className="w-6 h-6 mb-2" />
                                <span>Click here to upload signature image</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG recommended</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                        <button 
                            onClick={handleSave} 
                            disabled={!signatureFile}
                            className={`px-4 py-2 text-white rounded-lg transition ${signatureFile ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            <Image className="w-4 h-4 mr-2 inline-block"/> Save Uploaded Signature
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. Main Admit Card Form Component (Remains mostly the same) ---

const AdmitCard: React.FC = () => {
    const [jobCategory, setJobCategory] = useState('ssc');
    const [jobTitle, setJobTitle] = useState('');
    const [signatureData, setSignatureData] = useState(''); // Stores the Base64/data URL string
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerate = () => {
        console.log({ jobCategory, jobTitle, signatureData, pdfFile });
        // Replaced alert() with a custom modal/message box in a real app, but using window.alert for simplicity here
        window.alert('Admit Card Generated! Check Console.');
    };

    const handleSignatureSave = (data: string) => {
        setSignatureData(data);
    };

    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPdfFile(event.target.files[0]);
        }
    };
    
    // Available categories
    const categories = ['ssc', 'rrb', 'upsc', 'ibps'];

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-full">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
                
                <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b pb-3 flex items-center justify-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" /> Admit Card Form
                </h2>
                
                <div className="grid grid-cols-1 gap-y-6">
                    
                    {/* Job Category */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium w-1/3">Job Category :</label>
                        <div className="relative w-2/3">
                            <select
                                value={jobCategory}
                                onChange={(e) => setJobCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-blue-500 focus:border-blue-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Job Title */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium w-1/3">Job Title :</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Enter Job Title"
                            className="w-2/3 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Authorized Signature */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium w-1/3">Authorized Signature :</label>
                        <div className="w-2/3 flex items-center space-x-3">
                            {/* Display Signature Preview or Placeholder */}
                            <div 
                                className={`flex-1 p-1 border rounded-lg h-10 flex items-center justify-center cursor-pointer 
                                    ${signatureData ? 'border-green-500' : 'border-gray-300 bg-gray-50'}`}
                                onClick={() => setIsModalOpen(true)}
                            >
                                {signatureData ? (
                                    // Display the signature image using the data URL
                                    <img 
                                        src={signatureData} 
                                        alt="Authorized Signature" 
                                        className="h-full w-auto object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm italic">Click to Add Signature</span>
                                )}
                            </div>
                            
                            {/* Button to open Modal */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                <Signature className="w-4 h-4 mr-2" /> Sign
                            </button>
                        </div>
                    </div>
                    
                    {/* Location & PDF Upload (Combined based on image layout) */}
                    <div className="flex items-center justify-between">
                        <label className="text-gray-700 font-medium w-1/3">Location :</label>
                        <div className="w-2/3 flex items-center space-x-3">
                            {/* Hidden File Input */}
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handlePdfUpload} 
                                id="pdf-upload" 
                                className="hidden"
                            />
                            {/* Custom Upload Button */}
                            <label 
                                htmlFor="pdf-upload"
                                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                            >
                                <Upload className="w-4 h-4 mr-2" /> Upload PDF
                            </label>
                            {pdfFile && <span className="text-sm text-green-600">{pdfFile.name}</span>}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleGenerate}
                            className="px-12 py-3 bg-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>

            {/* Signature Modal Render */}
            <SignatureModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSignatureSave} 
            />
        </div>
    );
};

export default AdmitCard;