import { useLocation, useNavigate } from 'react-router-dom';

function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    if (!data) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-red-400">No data submitted. Please fill the form.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
            <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-lg space-y-6">
                <h1 className="text-3xl font-semibold text-[#00FFC6] text-center">Submission Successful 🎉</h1>
                <p className="text-center text-gray-400">Here are your submitted details:</p>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="bg-[#2a2a2a] p-4 rounded-lg border border-[#333]">
                            <p className="text-gray-400 uppercase text-xs font-medium">{formatLabel(key)}</p>
                            <p className="text-white font-semibold mt-1">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#00FFC6] text-black px-6 py-2 rounded-lg hover:bg-[#00dab0] transition"
                    >
                        Go Back to Form
                    </button>
                </div>
            </div>
        </div>
    );
}

const formatLabel = (label) => {
    return label
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
};

export default SuccessPage;
