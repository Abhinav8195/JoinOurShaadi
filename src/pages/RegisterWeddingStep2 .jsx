import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getCroppedImg from '../utils/cropImage';

const RegisterWeddingStep2 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cropped, setCropped] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [story, setStory] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('weddingStep1');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 12 * 1024 * 1024) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setCropped(null);
      setErrors((prev) => ({ ...prev, image: '' }));
    } else {
      setErrors((prev) => ({ ...prev, image: 'Image must be less than 12 MB' }));
    }
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropSave = async () => {
    try {
      const croppedImg = await getCroppedImg(preview, croppedAreaPixels);
      setCropped(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!cropped) newErrors.image = 'Feature image is required';
    if (!story.trim()) newErrors.story = 'Story is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const step2Data = {
        image: cropped,
        story,
        videoLink,
      };
      localStorage.setItem('weddingStep2', JSON.stringify(step2Data));
      navigate('/register/step3');
    }
  };

  const handleBack = () => navigate('/register');

  if (!data) {
    return <p className="text-center mt-20 text-xl text-red-600">Step 1 data missing. Please go back.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 px-4 py-16 font-[Inter]">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-10 space-y-8 border border-white/30">

        {/* Progress */}
        <div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-[#BF3366] w-2/4 animate-pulse rounded-full"></div>
          </div>
          <p className="text-sm text-[#BF3366] mt-2 font-semibold">Step 2 of 4: Tell us more about yourselves</p>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#BF3366] flex items-center gap-2">
          <Sparkles className="w-7 h-7" />
          Tell us more about yourselves
        </h2>

        {/* Image Upload Box */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
          <label className="text-lg font-medium">
            Upload a feature image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.heic,.webp"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          {preview && !cropped && (
            <>
              <div className="relative h-64 rounded-md overflow-hidden bg-black">
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="mt-2">
                <label className="text-sm">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={handleCropSave}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Cropped Image
              </button>
            </>
          )}

          {cropped && (
            <img
              src={cropped}
              alt="Cropped"
              className="mt-4 max-h-64 rounded-lg border object-cover"
            />
          )}

          <div className="text-sm text-gray-600 border-t pt-4 space-y-1">
            <p>Use a natural photo of the couple. Preferably pre-wedding or candid.</p>
            <p>Merged pics or video call screenshots also work.</p>
            <p><strong>Formats:</strong> JPG, PNG, HEIC, WebP | <strong>Max size:</strong> 12MB</p>
            <p><strong>Note:</strong>  Do not upload an image that explicitly depicts the exact location of your wedding. This includes maps or wedding invitation cards that reveal the specific address. Wedding images are publicly visible to all site visitors, therefore location-revealing images may attract non-paying travelers to the wedding site.

Please note that wedding registrations with such images may be subject to rejection by administrators.</p>
          </div>
        </div>

        {/* Story Box */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-2">
          <label className="text-lg font-medium">
            Your story <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={6}
            value={story}
            maxLength={1000}
            onChange={(e) => {
              setStory(e.target.value);
              setErrors((prev) => ({ ...prev, story: '' }));
            }}
            placeholder="Tell us how you met, your professions, or anything you wish to share..."
            className="w-full border border-gray-300 rounded-lg p-3 bg-white"
          />
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Make it heartfelt & inviting for guests.</p>
            <span className="text-gray-500">{story.length} / 1000</span>
          </div>
          {errors.story && <p className="text-red-500 text-sm">{errors.story}</p>}
        </div>

        {/* Optional Video */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-2">
          <label className="text-lg font-medium">Engagement Video (Optional)</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Paste YouTube link (if any)"
            className="w-full border border-gray-300 rounded-lg p-3 bg-white"
          />
          <p className="text-sm text-black font-bold">
           Do you have a(n engagement) video you would like to share with potential guests?
 
          </p>
          <p className="text-sm text-gray-600">A video on YouTube helps travelers to get to know you better and decide to join your wedding.</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#BF3366] text-white rounded-lg hover:bg-[#a22d56] transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWeddingStep2;
