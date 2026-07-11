import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { ImageUp, LoaderCircle, Scan } from 'lucide-react';
import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type YudielScannerProps = {
    onScan: (barcode: string) => void;
    triggerLabel?: ReactNode;
    title?: string;
    description?: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    className?: string;
};

const SUPPORTED_FORMATS = ['qr_code', 'code_128', 'aztec', 'data_matrix', 'pdf417'] as const;

async function createDetector() {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
        try {
            return new (window as any).BarcodeDetector({ formats: SUPPORTED_FORMATS });
        } catch {
            // fall through
        }
    }
    const { BarcodeDetector, setZXingModuleOverrides } = await import('barcode-detector');
    setZXingModuleOverrides({ locateFile: (path: string) => `/js/${path}` });
    return new BarcodeDetector({ formats: SUPPORTED_FORMATS as any });
}

export default function YudielScanner({
    onScan,
    triggerLabel = 'Scan Barcode',
    title = 'Scan Barcode',
    description = 'Arahkan kamera ke barcode untuk memindai.',
    variant = 'outline',
    size = 'default',
    disabled = false,
    className,
}: YudielScannerProps) {
    const [open, setOpen] = useState(false);
    const [manualBarcode, setManualBarcode] = useState('');
    const [error, setError] = useState('');
    const [scanningFile, setScanningFile] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleScan = useCallback(
        (detectedCodes: IDetectedBarcode[]) => {
            if (detectedCodes.length > 0) {
                onScan(detectedCodes[0].rawValue);
                setOpen(false);
            }
        },
        [onScan],
    );

    const handleError = useCallback((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Gagal mengakses kamera.');
    }, []);

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualBarcode.trim()) {
            onScan(manualBarcode.trim());
            setManualBarcode('');
            setOpen(false);
        }
    };

    const scanImageFile = useCallback(
        async (file: File) => {
            setScanningFile(true);
            setError('');

            try {
                const detector = await createDetector();

                const bitmap = await createImageBitmap(file);

                const codes = await detector.detect(bitmap);
                bitmap.close();

                if (codes.length > 0) {
                    onScan(codes[0].rawValue);
                    setPreviewUrl(null);
                    setOpen(false);
                } else {
                    setError('Tidak ada barcode yang terdeteksi di gambar ini.');
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Gagal memindai gambar.',
                );
            } finally {
                setScanningFile(false);
            }
        },
        [onScan],
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (previewUrl) URL.revokeObjectURL(previewUrl);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            scanImageFile(file);
        },
        [scanImageFile, previewUrl],
    );

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setError('');
                    setScanningFile(false);
                    setPreviewUrl(null);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button type="button" variant={variant} size={size} disabled={disabled} className={className}>
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative w-full h-[300px] bg-muted rounded-md overflow-hidden">
                        <Scanner
                            onScan={handleScan}
                            onError={handleError}
                            formats={SUPPORTED_FORMATS}
                            components={{ finder: true, torch: true, zoom: true }}
                            scanDelay={500}
                            sound
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Atau scan dari file gambar
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled={scanningFile}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {scanningFile ? (
                            <LoaderCircle className="mr-2 size-4 animate-spin" />
                        ) : (
                            <ImageUp className="mr-2 size-4" />
                        )}
                        {scanningFile
                            ? 'Memindai...'
                            : 'Pilih file gambar'}
                    </Button>
                    {previewUrl && (
                        <div className="relative w-full h-[150px] bg-muted rounded-md overflow-hidden">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Atau masukkan manual
                        </span>
                    </div>
                </div>

                <form onSubmit={handleManualSubmit} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Ketik kode barcode..."
                        value={manualBarcode}
                        onChange={(e) => setManualBarcode(e.target.value)}
                    />
                    <Button type="submit" variant="secondary">
                        Cari
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
