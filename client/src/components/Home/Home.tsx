import { BarChart3, CheckCircle, CheckSquare, FolderKanban, Star, Users, ArrowRight } from "lucide-react";
import { theme } from '../../../theme';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const Navigate = useNavigate()



    const features = [
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Get insights into your team's productivity and project performance with detailed analytics."
        },
        {
            icon: FolderKanban,
            title: "Project Management",
            description: "Organize and track all your projects in one centralized dashboard with progress tracking."
        },
        {
            icon: CheckSquare,
            title: "Task Tracking",
            description: "Manage individual tasks, set priorities, and track completion status across all projects."
        },
    ]

    return (
        <div className="bg-white text-gray-800" >

            <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Empower Your Team with <span style={{ color: theme.Primary }} >Seamless</span> Collaboration
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Experience real-time collaboration, file sharing, and project management in one place.
                </p>
                <div className="mt-6 flex justify-center  items-center" >
                    <div
                        onClick={() => Navigate('/dashboard')}
                        style={{ background: theme.Gradient }} className="w-auto flex gap-5 cursor-pointer hover:opacity-90 font-semibold text-white p-5 rounded-lg">
                        Go to  Dashboard
                        <span>
                            <ArrowRight />
                        </span>
                    </div>

                </div>
            </div>


            {/* <div className="bg-white py-12" >
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8">
                    <div>
                        <h2 className="text-3xl font-bold" style={{ color: theme.Primary }}>80%</h2>
                        <p className="text-gray-600">Seamless collaboration and task management</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold" style={{ color: theme.Primary }}>10K+</h2>
                        <p className="text-gray-600">Remote teams rely on our platform</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold" style={{ color: theme.Primary }}>98%</h2>
                        <p className="text-gray-600">High user satisfaction ratings</p>
                    </div>
                </div>
            </div> */}


            <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">
                        Organize, Prioritize, <span className="" style={{ color: theme.Primary }}>Achieve Goals</span>
                    </h2>
                    <p className="text-gray-600">
                        Streamline your workflow with powerful, intuitive tools that keep every team member aligned.
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <CheckCircle className="" style={{ color: theme.Primary }} size={40} />
                    <p className="text-lg font-medium">Easy task tracking & management</p>
                </div>
            </div>

            <section className="py-20">
                <div className="w-full flex justify-center items-center gap-10 flex-wrap">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="border-0 cursor-pointer w-80 h-70 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                        >
                            <div className="text-center">
                                <div className="w-12 h-12  rounded-lg flex items-center justify-center mx-auto mb-4" style={{ background: theme.Gradient }}>
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            </div>
                            <p className="text-center text-gray-600">{feature.description}</p>
                        </div>

                    ))}
                </div>

            </section>


            {/* <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-10">
                        Simple, <span style={{ color: theme.Primary }}>Transparent</span> Pricing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { plan: "Basic", price: "$0", features: ["Up to 30 users", "Task management", "File sharing"] },
                            { plan: "Pro", price: "$9.99", features: ["Unlimited users", "Advanced integrations", "Analytics dashboard"] },
                            { plan: "Enterprise", price: "$15.99", features: ["Custom solutions", "Dedicated support", "Admin controls"] }
                        ].map((pkg, i) => (
                            <div key={i} className="rounded-2xl shadow-lg">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold">{pkg.plan}</h3>
                                    <p className="text-3xl font-bold mt-4 " style={{ color: theme.Primary }}>{pkg.price}</p>
                                    <ul className="mt-6 space-y-2 text-gray-600">
                                        {pkg.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <Star className="w-4 h-4 " style={{ color: theme.Primary }} /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="mt-6 p-4 cursor-pointer w-full hover:opacity-80  text-white rounded-xl" style={{ background: theme.Gradient }}>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    );
}

export default Home