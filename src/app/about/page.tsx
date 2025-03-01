import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Target, Award, Calendar, MapPin } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AboutUs() {
    const [activeTab, setActiveTab] = useState('all');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const images = {
        hero: "/img1.png",
        logo: "/logo.png",
        viceChancellor: "/VC.png",
        coordinator: "/SC.png",
        activities: [
            {
                url: "/img1.png",
                alt: "Tree Plantation Drive",
                title: "Green Campus Initiative",
                description: "Over 1000 trees planted across campus",
                date: "March 15, 2024"
            },
            {
                url: "/img2.png",
                alt: "Waste Management Workshop",
                title: "Zero Waste Campaign",
                description: "Teaching sustainable waste practices",
                date: "March 20, 2024"
            },
            {
                url: "/img3.png",
                alt: "Climate Conference",
                title: "Climate Action Summit",
                description: "Annual conference on climate change",
                date: "April 5, 2024"
            },
            {
                url: "/img4.png",
                alt: "Earth Hour",
                title: "Earth Hour Celebration",
                description: "Campus-wide energy conservation",
                date: "March 30, 2024"
            }
        ],
        gallery: [
            {
                url: "/img5.png",
                alt: "Team Building",
                category: "Events",
                description: "Annual team building retreat"
            },
            {
                url: "/img6.png",
                alt: "Plantation Drive",
                category: "Activities",
                description: "Community plantation initiative"
            },
            {
                url: "/img7.png",
                alt: "Awareness Campaign",
                category: "Campaigns",
                description: "Street awareness program"
            },
            {
                url: "/img8.png",
                alt: "Workshop",
                category: "Education",
                description: "Environmental education workshop"
            },
            {
                url: "/img9.png",
                alt: "Community Event",
                category: "Events",
                description: "Community engagement program"
            },
            {
                url: "/img10.png",
                alt: "Research Project",
                category: "Research",
                description: "Climate research presentation"
            },
            {
                url: "/img11.png",
                alt: "Campus Initiative",
                category: "Activities",
                description: "Campus sustainability project"
            },
            {
                url: "/img12.png",
                alt: "Environmental Day",
                category: "Events",
                description: "World Environment Day celebration"
            }
        ],
        stats: [
            { icon: Users, value: "1000+", label: "Active Members" },
            { icon: Target, value: "50+", label: "Projects Completed" },
            { icon: Award, value: "15+", label: "Awards Won" },
            { icon: Calendar, value: "100+", label: "Events Organized" }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section with Parallax Effect */}
            <div className="relative h-screen bg-cover bg-center bg-fixed" style={{
                backgroundImage: `url(${images.hero})`
            }}><Navbar />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white px-4"
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 font-serif text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                                Christites for Climate Action
                            </span>
                        </h1>

                        <div className="flex justify-center items-center space-x-4 mb-6">

                            <p className="text-lg sm:text-xl font-semibold text-gray-300">
                                Preserve nature, protect the future, act for change. <br /> Sustain To Survive
                            </p>

                        </div>

                        <a
                            href="https://chat.whatsapp.com/D3dPl12GYDaGksPmOKrRPD"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-green-700 transition-all ease-in-out duration-300 transform"
                            >
                                Join Our Movement
                            </motion.button> </a> {/* Closing tag for <a> */}
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-green-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {images.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >


                                <div className="flex justify-center mb-4">
                                    <stat.icon className="h-12 w-12 text-green-600" />
                                </div>
                                <h3 className="text-4xl font-bold text-green-800 mb-2">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-4xl mx-auto mb-16 mt-8">
                <h2 className=" text-3xl font-bold text-green-800 mb-6">About CCA</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                    CHRISTITES FOR CLIMATE ACTION (CCA) is a movement initiated by Rev.Fr.Dr.Jose CC,
                    Vice Chancellor, CHRIST (Deemed to be University), to campaign for climate changes
                    and its consequences on Mother Earth. This student-led movement started with an
                    ultimate goal to take up the responsibility of conserving the environment from
                    campus to societal level.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                    The emphasis in CCA is given on developing an Eco-friendly lifestyle. CCA believes
                    that it's the primary responsibility of every CHRISTITE to be aware and create
                    awareness about climatic changes which is a looming threat to all life on mother Earth.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                    The CCA adopts the UN Sustainable Development Goal 13, along with many other goals
                    developed in the United Nation Sustainable Development Goals (2015) to urgently combat
                    climate change, aligning with the broader UN goals for global peace and prosperity.
                </p>
            </div>

            {/* Messages Section */}
            <div className="max-w-5xl mx-auto mb-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-green-50 p-8 rounded-lg relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <img
                                src={images.viceChancellor}
                                alt="Vice Chancellor"
                                className="w-[150px] h-[150px] rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>
                        <div className="pt-12">
                            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center mt-6">Vice Chancellor's Message</h3>
                            <p className="text-gray-700 italic">
                                "Climate change poses a global threat, with global warming serving as its undeniable signal.
                                Christites for Climate Action (CCA) is a movement to educate and create awareness among
                                the human community to take responsible action towards conservation and stop destruction.
                                Our collective actions today significantly influence the climate of tomorrow."
                            </p>
                            <p className="mt-4 font-semibold text-green-800 text-center text-xl">- Rev.Fr.Dr.Jose CC </p>
                            <p className="mt-0 font-semibold text-green-800 text-center text-sm">Vice Chancellor<br />Founder of CCA</p>
                        </div>
                    </div>
                    <div className="bg-green-50 p-8 rounded-lg relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <img
                                src={images.coordinator}
                                alt="Student Coordinator"
                                className="w-[150px] h-[150px] rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>
                        <div className="pt-12">
                            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center mt-6">Student Coordinator's Message</h3>
                            <p className="text-gray-700 italic">
                                "CCA is a dynamic student-led movement which was initiated to create awareness about
                                climate changes and its effects on the mother earth. Our main objective is to make
                                every citizen aware and responsible towards conservation of the planet."
                            </p>
                            <p className="mt-16 font-semibold text-green-800 text-center text-xl">- Suhas LS</p>
                            <p className="mt-0 font-semibold text-green-800 text-center text-sm">Student Coordinator<br />CCA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Activities */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-green-800 mb-12 text-center"
                    >
                        Upcoming Events
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {images.activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={activity.url}
                                        alt={activity.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                        {activity.date}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">{activity.title}</h3>
                                    <p className="text-gray-600 mb-4">{activity.description}</p>
                                    <button className="text-green-600 font-semibold hover:text-green-800 transition-colors">
                                        Learn More →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section with Timeline */}
            <div className="py-16 bg-green-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">Our Journey</h2>
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
                            <div className="space-y-12">
                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-600 rounded-full"></div>
                                    <div className="ml-8 bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold text-green-800 mb-2">2023</h3>
                                        <p className="text-gray-700">Launch of CCA with the vision to create a sustainable future</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-600 rounded-full"></div>
                                    <div className="mr-8 text-right bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold text-green-800 mb-2">2024</h3>
                                        <p className="text-gray-700">Expanded to multiple campuses and launched major initiatives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16 mt-8">
                <div className="bg-green-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Vision</h3>
                    <p className="text-gray-700">
                        To foster a harmonious coexistence between humanity and nature through proactive
                        environmental stewardship, ensuring a sustainable future for generations to come.
                    </p>
                </div>
                <div className="bg-green-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Mission</h3>
                    <p className="text-gray-700">
                        Engage, educate, and empower communities to take tangible actions towards environmental
                        preservation. Take up grassroots initiatives, advocacy, and collaboration, to protect
                        ecosystems, conserve resources, and promote eco-conscious lifestyles.
                    </p>
                </div>
            </div>

            {/* Objectives */}
            <div className="max-w-4xl mx-auto mb-16 mt-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">Our Objectives</h3>
                <div className="bg-green-50 p-8 rounded-lg shadow-lg">
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 mt-0.5">1</span>
                            <p className="text-gray-700">To drive an awareness campaign about climate change from campus to societal level</p>
                        </li>
                        <li className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 mt-0.5">2</span>
                            <p className="text-gray-700">To embrace sustainable practices and foster eco-friendly lifestyle</p>
                        </li>
                        <li className="flex items-start">
                            <span className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 mt-0.5">3</span>
                            <p className="text-gray-700">To take proactive steps toward climate resilience</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Gallery Section with Filtering */}
            <div className="py-16 bg-green-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">Our Gallery</h2>
                    <div className="flex justify-center mb-8 space-x-4">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-full ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-white text-green-600'}`}
                        >
                            All
                        </button>
                        {['Events', 'Activities', 'Campaigns', 'Education'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-4 py-2 rounded-full ${activeTab === category ? 'bg-green-600 text-white' : 'bg-white text-green-600'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.gallery
                            .filter(image => activeTab === 'all' || image.category === activeTab)
                            .map((image, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative overflow-hidden rounded-xl shadow-lg aspect-square"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                            <h3 className="text-xl font-bold mb-2">{image.alt}</h3>
                                            <p className="text-sm text-center">{image.description}</p>
                                            <span className="mt-2 px-3 py-1 bg-green-600 rounded-full text-sm">{image.category}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Contact Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-green-800 mb-12 text-center">Get Involved</h2>
                    <div className="max-w-6xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12">
                                <h3 className="text-2xl font-bold text-green-800 mb-8">Contact Us</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-green-700 mb-2">Office Location</h4>
                                            <p className="text-gray-700">
                                                Cabin 20, Block 3,<br />
                                                CHRIST (Deemed to be University),<br />
                                                Bangalore Central Campus
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-green-700 mb-2">Contact Coordinators</h4>
                                            <div className="space-y-2">
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Suhas LS:</span>
                                                    <a href="tel:+918217029775" className="ml-2 text-green-600 hover:text-green-800 transition-colors">
                                                        +91 82170 29775
                                                    </a>
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-medium">Sahil Gupta:</span>
                                                    <a href="tel:+917860959337" className="ml-2 text-green-600 hover:text-green-800 transition-colors">
                                                        +91 78609 59337
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-600 p-8 md:p-12 text-white">
                                <h3 className="text-2xl font-bold mb-8">Join Our Movement</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-2xl font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Register as a Volunteer</h4>
                                            <p className="text-green-100">Join our community of change-makers</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-2xl font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Attend Orientation</h4>
                                            <p className="text-green-100">Learn about our mission and activities</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-2xl font-bold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Start Making Impact</h4>
                                            <p className="text-green-100">Participate in our initiatives</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button><Footer />
        </div>
    );
}