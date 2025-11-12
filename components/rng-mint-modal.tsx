export interface StatusStep {
  step: string;
  timestamp: string;
}

function StatusItem({ step, timestamp }: StatusStep) {
  return (
    <div className="border border-gray-200 rounded-lg p-2 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="size-3 rounded-full bg-green-500 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">{step}</span>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RngMintModalProps {
  isOpen: boolean;
  statusSteps: StatusStep[];
  onClose: () => void;
}

export function RngMintModal({
  isOpen,
  statusSteps,
  onClose,
}: RngMintModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-6 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Minting...</h2>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-lg"
            >
              Close
            </button>
          </div>

        {/* Status List */}
        <div className="w-full space-y-2">
          {statusSteps.map((statusItem, index) => (
            <StatusItem
              key={index}
              step={statusItem.step}
              timestamp={statusItem.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
