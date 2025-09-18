'use client'

import { useState, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Webcam from 'react-webcam'
import { qrService } from '@/lib/services'

interface QRScannerProps {
  onScan?: (result: any) => void
  onClose?: () => void
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)
  const { data: session } = useSession()

  const startScanning = useCallback(() => {
    setIsScanning(true)
    setError(null)
    setResult(null)
  }, [])

  const stopScanning = useCallback(() => {
    setIsScanning(false)
  }, [])

  const handleScanQR = async (imageData: string) => {
    try {
      // In a real implementation, you'd use a QR code library like qr-scanner
      // For demo purposes, we'll simulate QR code detection
      console.log('Processing QR scan...')
      
      // Simulate QR code data
      const mockQRData = 'https://hotmessldn.com/scan/affiliate_123'
      
      const scanResult = await qrService.processQRScan(mockQRData, session?.user?.id)
      setResult(scanResult)
      
      if (onScan) {
        onScan(scanResult)
      }
      
      stopScanning()
    } catch (err) {
      setError('Failed to process QR code')
      console.error('QR scan error:', err)
    }
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      handleScanQR(imageSrc)
    }
  }, [webcamRef])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-800 max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-hotpink">
              QR Scanner
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {!session && (
            <div className="text-center mb-6">
              <p className="text-gray-400 mb-4">
                Sign in to track scans and earn rewards!
              </p>
              <a href="/auth/signin" className="btn-primary text-sm">
                Sign In
              </a>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-800 text-red-200 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-900 border border-green-800 text-green-200 p-4 rounded-lg mb-4">
              <h3 className="font-heading font-bold mb-2">Scan Success!</h3>
              <p className="text-sm mb-2">{result.message}</p>
              {result.type === 'affiliate' && (
                <p className="text-xs">Reward: {result.reward}</p>
              )}
              {result.type === 'ar_unlock' && (
                <p className="text-xs">AR Experience: {result.experience}</p>
              )}
            </div>
          )}

          {isScanning ? (
            <div className="space-y-4">
              <div className="aspect-square bg-black rounded-lg overflow-hidden relative">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{
                    facingMode: 'environment' // Use back camera
                  }}
                />
                <div className="absolute inset-0 border-2 border-hotpink border-dashed rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-hotpink"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-hotpink"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-hotpink"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-hotpink"></div>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                  Position QR code within frame
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={capture}
                  className="btn-primary"
                >
                  📷 Capture
                </button>
                <button
                  onClick={stopScanning}
                  className="btn-secondary"
                >
                  Stop Scanning
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-4xl">📱</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Scan HOTMESS QR codes to unlock rewards, AR experiences, and track affiliate earnings.
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={startScanning}
                  className="btn-primary w-full"
                >
                  🔍 Start Scanning
                </button>
                
                <div className="text-sm text-gray-500">
                  <p>Scan codes for:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Affiliate rewards (£0.10 per scan)</li>
                    <li>AR experience unlocks</li>
                    <li>Event check-ins</li>
                    <li>Product authenticity</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}