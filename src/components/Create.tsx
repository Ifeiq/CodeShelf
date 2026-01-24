import CreateHud from '@/components/CreateHud';
import TopHeader from '@/create/TopHeader';
import Header from '@/create/Header';
import Plans from '@/create/Plans';
import About from '@/create/About';
import Footer from '@/create/Footer';

export default function Create() {
    
    return (
        <div className="bg-[#0d0d0d] py-16">
            
            <TopHeader />
            <Header />
            <Plans />
            <About />
            <Footer />
        </div>
    );
}