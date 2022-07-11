import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";


export default function CreateDropForm({
    minting,
    dropForm,
    setDropForm,
    setMinting,
    }) {
    // TRACK STATE
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [audio, setAudio] = useState(null);
    console.log("audio", audio);

    const [track, setTrack] = useState({
    title: "",
    artist: "",
    trackNumber: minting.length + 1,
    duration: "",
    description: "",
    imageCoverFile: image,
    audioFile: audio,
    });

    console.log(track);

    function closeModal() {
    setDropForm(false);
    }
    return (
    <>
        <Transition appear show={dropForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden  bg-stone-100 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Track #{minting.length + 1}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            This information is specific for each track.
                        </p>
                        </div>
                        {previewUrl && (
                        <div className="mt-4  border border-stone-500 rounded-lg overflow-hidden">
                            <Image
                            src={previewUrl}
                            alt="preview url for track"
                            layout="responsive"
                            objectFit="cover"
                            width={500}
                            height={500}
                            />
                        </div>
                        )}
                        {audio && (
                        <audio controls className="mt-4">
                            <source src={URL.createObjectURL(audio)} />
                        </audio>
                        )}
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form
                        onSubmit={(e: React.SyntheticEvent) => {
                            e.preventDefault();
                            const target = e.target as typeof e.target & {
                            title: { value: string };
                            artist: { value: string };
                            trackNumber: { value: string };
                            duration: { value: string };
                            description: { value: string };
                            imageCoverFile: { value: string };
                            audioFile: { value: string };
                            };
                            const title = target.title.value;
                            const artist = target.artist.value;
                            const trackNumber = minting.length + 1;
                            const duration = target.duration.value;
                            const description = target.description.value;
                            const imageCoverFile = image;
                            const audioFile = audio;

                            setTrack({
                            title,
                            artist,
                            trackNumber,
                            duration,
                            description,
                            imageCoverFile,
                            audioFile,
                            });
                            setMinting([
                            ...minting,
                            {
                                title,
                                artist,
                                trackNumber,
                                duration,
                                description,
                                imageCoverFile,
                                audioFile,
                            },
                            ]);
                            setDropForm(false);
                        }}
                        >
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                <label
                                    htmlFor="artist"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Artist Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                    type="text"
                                    name="artist"
                                    id="artist"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="Artist Name"
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Track Name
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="Track Name"
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                <label
                                    htmlFor="duration"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Track duration
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                    type="text"
                                    name="duration"
                                    id="duration"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="03:45"
                                    />
                                </div>
                                </div>
                            </div>

                            <div>
                                <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Description (something you want to add in
                                reference to the track)
                                </label>
                                <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    maxLength={300}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    placeholder="this song is awesome"
                                    defaultValue={""}
                                />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                300 characters max
                                </p>
                            </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition>
    </>
    );
}