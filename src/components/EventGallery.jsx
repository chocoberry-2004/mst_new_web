import React, { useState } from 'react';
import { useEventContext } from '../providers/EventProvider';
import logo from '../assets/images/mst_logo1.png';


function EventGallery() {
    const { events, loading, error } = useEventContext();

    const [isOpen, setIsOpen] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error loading events: {error.message}</div>;
    if (!events || events.length === 0) return <div>No events found</div>;

    // Filter past events FIRST
    const pastEvents = events?.filter(event => event.status === "past") || [];

    const openModal = (eventIndex, imageIndex = 0) => {
        setCurrentEventIndex(eventIndex);
        setCurrentImageIndex(imageIndex);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const prevImage = () => {
        const images = pastEvents[currentEventIndex].images;
        setCurrentImageIndex(prev =>
        prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        const images = pastEvents[currentEventIndex].images;
        setCurrentImageIndex(prev =>
        prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevEvent = () => {
        setCurrentEventIndex(prev =>
        prev === 0 ? pastEvents.length - 1 : prev - 1
        );
        setCurrentImageIndex(0);
    };

    const nextEvent = () => {
        setCurrentEventIndex(prev =>
        prev === pastEvents.length - 1 ? 0 : prev + 1
        );
        setCurrentImageIndex(0);
    };

    const currentEvent = pastEvents[currentEventIndex];

    return (
    <div>
        {/* Event thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pastEvents.map((event, eventIndex) =>
            event.images?.map((img, imageIndex) => (
                <div
                key={`${event.id}-${imageIndex}`}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openModal(eventIndex, imageIndex)}
                >
                <img
                    src={img}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm text-gray-300">{event.date}</div>
                    </div>
                </div>
                </div>
            ))
            )}
        </div>

        {/* Modal */}
        {isOpen && currentEvent && (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
        >
            {/* Modal Box */}
            <div
            className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
            >
            
            {/* header section */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-300">

            {/* Left Section */}
            <div className="flex gap-3 items-center">
                <img
                src={logo}
                alt="MST Logo"
                className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
                />

                <div>
                <h1 className="font-semibold text-lg">M.S.T</h1>
                <p className="text-sm text-gray-500">Events Gallery</p>
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer
                transition-transform duration-300 hover:rotate-90"
                >
                <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
            </button>

            </div>

            {/* Event image */}
            <div className="relative">
                <img
                src={currentEvent.images[currentImageIndex]}
                alt={currentEvent.title}
                className="w-full h-96 object-cover rounded-lg"
                />

                {/* Image navigation */}
                {currentEvent.images.length > 1 && (
                <>
                    <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow cursor-pointer"
                    >
                    &#10094;
                    </button>

                    <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow cursor-pointer"
                    >
                    &#10095;
                    </button>
                </>
                )}
            </div>

            {/* Event info */}
            <h2 className="mt-4 text-xl font-semibold">{currentEvent.title}</h2>
            <p className="mt-2 text-gray-600">{currentEvent.description}</p>

            {/* Event navigation */}
            <div className="flex justify-between mt-4">
                <button
                onClick={prevEvent}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                Previous Event
                </button>

                <button
                onClick={nextEvent}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                Next Event
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
}

export default EventGallery;