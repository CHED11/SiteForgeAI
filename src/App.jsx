import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import EnquiryForm from './components/EnquiryForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileCallBar from './components/MobileCallBar'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pb-14 lg:pb-0">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Process />
        <EnquiryForm />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
