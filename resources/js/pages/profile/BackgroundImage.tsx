import { router, usePage } from '@inertiajs/react';
import { Camera, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { PageProps, Post, User } from '../helper/types';
export default function backgroundImage() {
    const backgroundInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { user, auth } = usePage<{ user: User & { posts: Post[] }; auth: { user: User | null } }>().props;

    const isProfileOwner = auth?.user?.id === user.id;
    const handleImageClick = () => {
        if (backgroundInputRef.current) {
            backgroundInputRef.current.click();
        }
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // preview file
            setFileToUpload(file); // store for uploading later
        }
    };
    const handleCancel = () => {
        setSelectedImage(null);
        setFileToUpload(null);
        if (backgroundInputRef.current) {
            backgroundInputRef.current.value = '';
        }
    };
    const handleSaveBackground = async () => {
        if (!fileToUpload) return;
        const formData = new FormData();
        formData.append('background', fileToUpload);
        try {
            setIsSaving(true);
            await router.post('/profile/backgroundImage', formData, {
                forceFormData: true,
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash as PageProps['flash'];
                    if (flash?.success) {
                        toast.success(flash.success, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                    if (flash?.error) {
                        toast.error(flash.error, {
                            duration: 2000,
                            position: 'top-right',
                        });
                    }
                    resetForm();
                    
                },
                onError: (errors) => {
                    // Handle errors
                    if (errors) {
                        Object.values(errors).forEach((error) => {
                            toast.error(error, {
                                duration: 2000,
                                position: 'top-right',
                            });
                        });
                    }
                    resetForm();
                },
            });
           
        } catch (error) {
            toast.error('An unexpected error occurred', {
                duration: 2000,
                position: 'top-right',
            });
        } finally {
            setIsSaving(false);
        }
    };
    const resetForm = () => {
        setSelectedImage(null);
        setFileToUpload(null);
        if (backgroundInputRef.current) {
            backgroundInputRef.current.value = '';
        }
    };
    // end upload background image
    return (
        <>
            <div className="relative h-40 w-full bg-gradient-to-r from-indigo-500 to-purple-600 sm:h-48 dark:from-indigo-700 dark:to-purple-800">
                <img
                    src={
                        selectedImage ||
                        (user.profile?.cover_image ? `/storage/${user.profile.cover_image}` : '/storage/profileImages/default-background.png')
                    }
                    alt="Profile background"
                    // onClick={handleImageClick}
                    className="h-full w-full object-cover opacity-90"
                />
                {isProfileOwner && (
                    <div className="space-y-4">
                        <input
                            type="file"
                            name="background"
                            id="background"
                            ref={backgroundInputRef}
                            onChange={handleFileChange}
                            className="absolute top-4 right-4 hidden rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur-sm hover:bg-white sm:text-sm"
                            accept="image/*"
                        />

                        {/* Top left "Change Background" button */}
                        {!fileToUpload && (
                            <button
                                onClick={handleImageClick}
                                className="text-indigo-600shadow absolute top-2 right-4 flex cursor-pointer items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-[11px] font-medium transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Camera size={16} strokeWidth={1.5} /> Change Cover
                            </button>
                        )}

                        {/* Top right "Save Background" button */}
                        {fileToUpload && (
                            <div className="absolute top-0 flex w-full justify-end gap-2 p-2">
                                <button
                                    onClick={handleCancel}
                                    className="text-indigo-600shadow flex cursor-pointer items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-[11px] font-medium transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <X size={16} strokeWidth={1.75} /> Cancel
                                </button>
                                <button
                                    onClick={handleImageClick}
                                    className="text-indigo-600shadow flex cursor-pointer items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-[11px] font-medium transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Camera size={16} strokeWidth={1.5} /> Change Cover
                                </button>

                                <button
                                    onClick={handleSaveBackground}
                                    disabled={isSaving}
                                    className="text-indigo-600shadow flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-[11px] font-medium transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Cover'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
