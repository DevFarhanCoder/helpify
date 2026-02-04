import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Business from "./models/Business.js";
import User from "./models/User.js";

dotenv.config();

const sampleBusinesses = [
  // Electronics
  {
    name: "Sharma Electronics",
    ownerName: "Rajesh Sharma",
    category: "Electronics",
    location: "Connaught Place, Delhi",
    phone: "+91 9876543210",
    description:
      "Leading electronics store offering smartphones, laptops, home appliances, and accessories at competitive prices. Authorized dealer for Samsung, Apple, and LG.",
    image: "https://picsum.photos/400/300?random=19",
  },
  {
    name: "TechWorld Solutions",
    ownerName: "Amit Kumar",
    category: "Electronics",
    location: "Sector 18, Noida",
    phone: "+91 9876543211",
    description:
      "One-stop shop for all electronics needs. Specializing in computers, gaming consoles, and smart home devices. Expert repair services available.",
    image: "https://picsum.photos/400/300?random=29",
  },
  {
    name: "Digital Hub",
    ownerName: "Priya Singh",
    category: "Electronics",
    location: "Park Street, Kolkata",
    phone: "+91 9876543212",
    description:
      "Premium electronics showroom featuring latest gadgets, cameras, and audio equipment. Free home delivery and installation.",
    image: "https://picsum.photos/400/300?random=39",
  },

  // Restaurants
  {
    name: "Green Garden Restaurant",
    ownerName: "Priya Patel",
    category: "Restaurant",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543213",
    description:
      "Family restaurant specializing in North Indian and Chinese cuisine. Fresh ingredients, hygienic preparation. Perfect for family dinners and celebrations.",
    image: "https://picsum.photos/400/300?random=51",
  },
  {
    name: "Spice Villa",
    ownerName: "Mohammed Raza",
    category: "Restaurant",
    location: "MG Road, Pune",
    phone: "+91 9876543214",
    description:
      "Authentic Indian cuisine with a modern twist. Specializing in Mughlai and Tandoori dishes. Live music on weekends.",
    image: "https://picsum.photos/400/300?random=61",
  },
  {
    name: "Coastal Kitchen",
    ownerName: "Ramesh Nair",
    category: "Restaurant",
    location: "Marine Drive, Mumbai",
    phone: "+91 9876543215",
    description:
      "Seafood paradise offering fresh catches daily. Famous for Kerala and Goan coastal delicacies. Sea-facing dining area.",
    image: "https://picsum.photos/400/300?random=71",
  },
  {
    name: "Vegan Delight",
    ownerName: "Sneha Reddy",
    category: "Restaurant",
    location: "Banjara Hills, Hyderabad",
    phone: "+91 9876543216",
    description:
      "100% plant-based restaurant with organic ingredients. Healthy, delicious, and environmentally conscious dining experience.",
    image: "https://picsum.photos/400/300?random=81",
  },

  // Salons
  {
    name: "Style Hair Salon",
    ownerName: "Amit Kumar",
    category: "Salon",
    location: "Bandra West, Mumbai",
    phone: "+91 9876543217",
    description:
      "Premium hair salon offering haircuts, styling, coloring, and spa treatments for men and women. Expert stylists with 10+ years experience.",
    image: "https://picsum.photos/400/300?random=93",
  },
  {
    name: "Glamour Studio",
    ownerName: "Neha Kapoor",
    category: "Salon",
    location: "South Extension, Delhi",
    phone: "+91 9876543218",
    description:
      "Luxury beauty salon specializing in bridal makeup, hair styling, and skincare treatments. Book your appointment today!",
    image: "https://picsum.photos/400/300?random=103",
  },
  {
    name: "Men's Grooming Lounge",
    ownerName: "Rahul Verma",
    category: "Salon",
    location: "Jubilee Hills, Hyderabad",
    phone: "+91 9876543219",
    description:
      "Exclusive men's salon offering premium grooming services, beard styling, and spa treatments in a sophisticated environment.",
    image: "https://picsum.photos/400/300?random=113",
  },

  // Grocery
  {
    name: "Fresh Mart",
    ownerName: "Suresh Gupta",
    category: "Grocery",
    location: "Malviya Nagar, Jaipur",
    phone: "+91 9876543220",
    description:
      "Your neighborhood grocery store with fresh vegetables, fruits, and daily essentials. Home delivery available within 2 hours.",
    image: "https://picsum.photos/400/300?random=125",
  },
  {
    name: "Organic Bazaar",
    ownerName: "Kavita Sharma",
    category: "Grocery",
    location: "Whitefield, Bangalore",
    phone: "+91 9876543221",
    description:
      "Certified organic grocery store offering pesticide-free vegetables, fruits, and organic products. Supporting local farmers.",
    image: "https://picsum.photos/400/300?random=135",
  },
  {
    name: "Daily Needs Supermarket",
    ownerName: "Rajesh Mehta",
    category: "Grocery",
    location: "Andheri East, Mumbai",
    phone: "+91 9876543222",
    description:
      "Complete supermarket with groceries, household items, and personal care products. Great offers every week!",
    image: "https://picsum.photos/400/300?random=145",
  },

  // Pharmacy
  {
    name: "MediCare Pharmacy",
    ownerName: "Dr. Anil Joshi",
    category: "Pharmacy",
    location: "Parel, Mumbai",
    phone: "+91 9876543223",
    description:
      "24/7 pharmacy with licensed pharmacists. Wide range of medicines, healthcare products, and free home delivery.",
    image: "https://picsum.photos/400/300?random=157",
  },
  {
    name: "HealthPlus Drugstore",
    ownerName: "Meera Desai",
    category: "Pharmacy",
    location: "Sector 15, Chandigarh",
    phone: "+91 9876543224",
    description:
      "Trusted pharmacy providing quality medicines and health supplements. Expert consultation available.",
    image: "https://picsum.photos/400/300?random=167",
  },
  {
    name: "WellCare Chemist",
    ownerName: "Sunil Rao",
    category: "Pharmacy",
    location: "Indiranagar, Bangalore",
    phone: "+91 9876543225",
    description:
      "Modern pharmacy with digital prescription management. Surgical equipment and medical devices also available.",
    image: "https://picsum.photos/400/300?random=177",
  },

  // Clothing
  {
    name: "Fashion Hub",
    ownerName: "Simran Kaur",
    category: "Clothing",
    location: "Sarojini Nagar, Delhi",
    phone: "+91 9876543226",
    description:
      "Trendy clothing store for men and women. Latest fashion at affordable prices. New collection every month!",
    image: "https://picsum.photos/400/300?random=189",
  },
  {
    name: "Ethnic Elegance",
    ownerName: "Lakshmi Iyer",
    category: "Clothing",
    location: "T Nagar, Chennai",
    phone: "+91 9876543227",
    description:
      "Exclusive ethnic wear boutique specializing in sarees, salwar suits, and traditional jewelry. Custom tailoring available.",
    image: "https://picsum.photos/400/300?random=199",
  },
  {
    name: "Kids Fashion Store",
    ownerName: "Pooja Agarwal",
    category: "Clothing",
    location: "Vastrapur, Ahmedabad",
    phone: "+91 9876543228",
    description:
      "Complete range of children's clothing from newborn to 14 years. Comfortable, stylish, and affordable.",
    image: "https://picsum.photos/400/300?random=209",
  },

  // Gym
  {
    name: "FitZone Gym",
    ownerName: "Vikram Singh",
    category: "Gym",
    location: "Powai, Mumbai",
    phone: "+91 9876543229",
    description:
      "State-of-the-art gym with modern equipment, personal trainers, and group fitness classes. Transform your body today!",
    image: "https://picsum.photos/400/300?random=221",
  },
  {
    name: "Iron Paradise",
    ownerName: "Rohit Sharma",
    category: "Gym",
    location: "HSR Layout, Bangalore",
    phone: "+91 9876543230",
    description:
      "Hardcore bodybuilding gym with professional equipment. Certified trainers and nutrition guidance included.",
    image: "https://picsum.photos/400/300?random=231",
  },
  {
    name: "Yoga & Wellness Center",
    ownerName: "Anjali Deshmukh",
    category: "Gym",
    location: "Aundh, Pune",
    phone: "+91 9876543231",
    description:
      "Holistic fitness center offering yoga, meditation, zumba, and aerobics. Special classes for women and seniors.",
    image: "https://picsum.photos/400/300?random=241",
  },

  // Education
  {
    name: "Smart Learning Academy",
    ownerName: "Dr. Ramesh Kumar",
    category: "Education",
    location: "Kota, Rajasthan",
    phone: "+91 9876543232",
    description:
      "Premier coaching institute for JEE and NEET preparation. Expert faculty with proven track record.",
    image: "https://picsum.photos/400/300?random=253",
  },
  {
    name: "English Mastery Institute",
    ownerName: "Sarah Johnson",
    category: "Education",
    location: "Salt Lake, Kolkata",
    phone: "+91 9876543233",
    description:
      "IELTS, TOEFL, and spoken English classes by native speakers. Study abroad consultation available.",
    image: "https://picsum.photos/400/300?random=263",
  },
  {
    name: "Coding Wizards",
    ownerName: "Arjun Patel",
    category: "Education",
    location: "Hitech City, Hyderabad",
    phone: "+91 9876543234",
    description:
      "Programming classes for kids and adults. Python, Java, Web Development, and AI courses available.",
    image: "https://picsum.photos/400/300?random=273",
  },

  // Hotels
  {
    name: "Grand Plaza Hotel",
    ownerName: "Vikash Oberoi",
    category: "Hotels",
    location: "MG Road, Bangalore",
    phone: "+91 9876543235",
    description:
      "Luxury 5-star hotel with spacious rooms, rooftop pool, spa, and fine dining restaurant. Perfect for business and leisure.",
    image: "https://picsum.photos/400/300?random=285",
  },
  {
    name: "Comfort Inn & Suites",
    ownerName: "Meera Nair",
    category: "Hotels",
    location: "Viman Nagar, Pune",
    phone: "+91 9876543236",
    description:
      "Budget-friendly hotel near airport with clean rooms, free WiFi, and complimentary breakfast. Ideal for travelers.",
    image: "https://picsum.photos/400/300?random=295",
  },
  {
    name: "Heritage Palace Resort",
    ownerName: "Rajveer Singh",
    category: "Hotels",
    location: "City Palace Road, Jaipur",
    phone: "+91 9876543237",
    description:
      "Royal heritage hotel with traditional Rajasthani architecture, cultural shows, and authentic cuisine.",
    image: "https://picsum.photos/400/300?random=305",
  },

  // Beauty Spa
  {
    name: "Serenity Spa & Wellness",
    ownerName: "Priya Malhotra",
    category: "Beauty Spa",
    location: "Bandra West, Mumbai",
    phone: "+91 9876543238",
    description:
      "Luxury spa offering Thai massage, aromatherapy, facial treatments, and body wraps. Experienced therapists.",
    image: "https://picsum.photos/400/300?random=317",
  },
  {
    name: "Bliss Ayurveda Center",
    ownerName: "Dr. Sunita Rao",
    category: "Beauty Spa",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543239",
    description:
      "Authentic Ayurvedic spa with panchakarma treatments, herbal therapies, and yoga sessions for complete wellness.",
    image: "https://picsum.photos/400/300?random=327",
  },
  {
    name: "Luxury Unisex Spa",
    ownerName: "Karan Mehta",
    category: "Beauty Spa",
    location: "Jubilee Hills, Hyderabad",
    phone: "+91 9876543240",
    description:
      "Premium spa services for men and women including deep tissue massage, scrubs, and beauty treatments.",
    image: "https://picsum.photos/400/300?random=337",
  },

  // Home Decor
  {
    name: "Elegant Interiors",
    ownerName: "Neha Kapoor",
    category: "Home Decor",
    location: "Kirti Nagar, Delhi",
    phone: "+91 9876543241",
    description:
      "Complete home furnishing store with furniture, curtains, lighting, and decorative items. Custom designs available.",
    image: "https://picsum.photos/400/300?random=349",
  },
  {
    name: "Modern Living Furniture",
    ownerName: "Aditya Sharma",
    category: "Home Decor",
    location: "Hiranandani, Mumbai",
    phone: "+91 9876543242",
    description:
      "Contemporary furniture showroom featuring modular kitchens, bedroom sets, and living room furniture. EMI available.",
    image: "https://picsum.photos/400/300?random=359",
  },
  {
    name: "Artistic Home Decor",
    ownerName: "Ritu Jain",
    category: "Home Decor",
    location: "Jayanagar, Bangalore",
    phone: "+91 9876543243",
    description:
      "Unique home decor items including wall art, handicrafts, and designer accessories. Support local artisans.",
    image: "https://picsum.photos/400/300?random=369",
  },

  // Wedding Planning
  {
    name: "Dream Wedding Planners",
    ownerName: "Divya Reddy",
    category: "Wedding Planning",
    location: "Jubilee Hills, Hyderabad",
    phone: "+91 9876543244",
    description:
      "Full-service wedding planning including venue selection, catering, decoration, and photography. Make your day special!",
    image: "https://picsum.photos/400/300?random=381",
  },
  {
    name: "Royal Events & Weddings",
    ownerName: "Karan Bhatia",
    category: "Wedding Planning",
    location: "Civil Lines, Jaipur",
    phone: "+91 9876543245",
    description:
      "Destination wedding specialists creating royal experiences. Complete management from engagement to reception.",
    image: "https://picsum.photos/400/300?random=391",
  },
  {
    name: "Perfect Moments Wedding",
    ownerName: "Anjali Gupta",
    category: "Wedding Planning",
    location: "Park Street, Kolkata",
    phone: "+91 9876543246",
    description:
      "Budget-friendly wedding planning with creative themes, entertainment arrangements, and vendor coordination.",
    image: "https://picsum.photos/400/300?random=401",
  },

  // Rent & Hire
  {
    name: "QuickRent Services",
    ownerName: "Sunil Agarwal",
    category: "Rent & Hire",
    location: "Sector 62, Noida",
    phone: "+91 9876543247",
    description:
      "Rent furniture, appliances, electronics for homes and events. Flexible rental periods and affordable rates.",
    image: "https://picsum.photos/400/300?random=413",
  },
  {
    name: "Party Equipment Rentals",
    ownerName: "Rahul Joshi",
    category: "Rent & Hire",
    location: "Andheri West, Mumbai",
    phone: "+91 9876543248",
    description:
      "Complete party rental solutions including tents, chairs, tables, sound systems, and lighting equipment.",
    image: "https://picsum.photos/400/300?random=423",
  },
  {
    name: "Construction Equipment Hire",
    ownerName: "Deepak Kumar",
    category: "Rent & Hire",
    location: "Whitefield, Bangalore",
    phone: "+91 9876543249",
    description:
      "Heavy equipment rental for construction projects. JCBs, cranes, mixers available with operators.",
    image: "https://picsum.photos/400/300?random=433",
  },

  // Hospitals
  {
    name: "City Care Hospital",
    ownerName: "Dr. Ashok Kumar",
    category: "Hospitals",
    location: "Civil Lines, Delhi",
    phone: "+91 9876543250",
    description:
      "Multi-specialty hospital with 24/7 emergency services, ICU, and advanced diagnostic facilities. Expert doctors.",
    image: "https://picsum.photos/400/300?random=445",
  },
  {
    name: "Apollo Wellness Center",
    ownerName: "Dr. Meera Desai",
    category: "Hospitals",
    location: "Banjara Hills, Hyderabad",
    phone: "+91 9876543251",
    description:
      "Premium healthcare facility offering cardiology, orthopedics, and maternity services. Insurance accepted.",
    image: "https://picsum.photos/400/300?random=455",
  },
  {
    name: "Sunrise Children's Hospital",
    ownerName: "Dr. Ravi Shankar",
    category: "Hospitals",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543252",
    description:
      "Specialized pediatric hospital with child-friendly environment. Expert pediatricians and neonatologists.",
    image: "https://picsum.photos/400/300?random=465",
  },

  // Contractors
  {
    name: "BuildRight Contractors",
    ownerName: "Sanjay Verma",
    category: "Contractors",
    location: "Sector 18, Gurgaon",
    phone: "+91 9876543253",
    description:
      "Complete construction services for residential and commercial projects. Quality work with timely delivery.",
    image: "https://picsum.photos/400/300?random=477",
  },
  {
    name: "Elite Renovation Services",
    ownerName: "Rajesh Patel",
    category: "Contractors",
    location: "Aundh, Pune",
    phone: "+91 9876543254",
    description:
      "Home renovation and remodeling experts. Kitchen, bathroom, and interior renovation specialists.",
    image: "https://picsum.photos/400/300?random=487",
  },
  {
    name: "Green Build Solutions",
    ownerName: "Ankit Sharma",
    category: "Contractors",
    location: "Viman Nagar, Pune",
    phone: "+91 9876543255",
    description:
      "Eco-friendly construction using sustainable materials. Residential villas and apartment construction.",
    image: "https://picsum.photos/400/300?random=497",
  },

  // Pet Shops
  {
    name: "Pet Paradise Store",
    ownerName: "Pooja Mehta",
    category: "Pet Shops",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543256",
    description:
      "Complete pet store with food, accessories, toys, and grooming services for dogs, cats, and birds.",
    image: "https://picsum.photos/400/300?random=509",
  },
  {
    name: "Happy Paws Pet Clinic",
    ownerName: "Dr. Vivek Malhotra",
    category: "Pet Shops",
    location: "Banjara Hills, Hyderabad",
    phone: "+91 9876543257",
    description:
      "Pet clinic and store offering veterinary services, grooming, boarding, and training. Expert pet care.",
    image: "https://picsum.photos/400/300?random=519",
  },
  {
    name: "Aquarium World",
    ownerName: "Arjun Rao",
    category: "Pet Shops",
    location: "Kamla Nagar, Delhi",
    phone: "+91 9876543258",
    description:
      "Specialist in aquarium fish, tanks, and accessories. Aquarium setup and maintenance services available.",
    image: "https://picsum.photos/400/300?random=529",
  },

  // PG/Hostels
  {
    name: "Student Hub PG",
    ownerName: "Suresh Kumar",
    category: "PG/Hostels",
    location: "Kota, Rajasthan",
    phone: "+91 9876543259",
    description:
      "Clean and affordable PG for students with WiFi, mess facility, and 24/7 security. Close to coaching centers.",
    image: "https://picsum.photos/400/300?random=541",
  },
  {
    name: "Professional's Co-living",
    ownerName: "Meera Singh",
    category: "PG/Hostels",
    location: "HSR Layout, Bangalore",
    phone: "+91 9876543260",
    description:
      "Premium co-living spaces for working professionals with housekeeping, laundry, and gym facilities.",
    image: "https://picsum.photos/400/300?random=551",
  },
  {
    name: "Women's Hostel Haven",
    ownerName: "Anita Verma",
    category: "PG/Hostels",
    location: "Salt Lake, Kolkata",
    phone: "+91 9876543261",
    description:
      "Safe and comfortable hostel exclusively for women with CCTV surveillance and nutritious meals.",
    image: "https://picsum.photos/400/300?random=561",
  },

  // Estate Agent
  {
    name: "Prime Properties",
    ownerName: "Rakesh Sharma",
    category: "Estate Agent",
    location: "DLF Phase 1, Gurgaon",
    phone: "+91 9876543262",
    description:
      "Leading real estate consultants for buying, selling, and renting properties. Residential and commercial expertise.",
    image: "https://picsum.photos/400/300?random=573",
  },
  {
    name: "Dream Home Realty",
    ownerName: "Kavita Reddy",
    category: "Estate Agent",
    location: "Jubilee Hills, Hyderabad",
    phone: "+91 9876543263",
    description:
      "Trusted property dealers specializing in luxury apartments and villas. Free property valuation service.",
    image: "https://picsum.photos/400/300?random=583",
  },
  {
    name: "Urban Living Real Estate",
    ownerName: "Amit Jain",
    category: "Estate Agent",
    location: "Indiranagar, Bangalore",
    phone: "+91 9876543264",
    description:
      "Real estate consultancy for residential and commercial properties. Legal assistance and loan support available.",
    image: "https://picsum.photos/400/300?random=593",
  },

  // Dentists
  {
    name: "Smile Care Dental Clinic",
    ownerName: "Dr. Sangeeta Patel",
    category: "Dentists",
    location: "Navrangpura, Ahmedabad",
    phone: "+91 9876543265",
    description:
      "Advanced dental care with root canal, implants, orthodontics, and cosmetic dentistry. Painless treatments.",
    image: "https://picsum.photos/400/300?random=605",
  },
  {
    name: "Perfect Teeth Orthodontics",
    ownerName: "Dr. Rajesh Kumar",
    category: "Dentists",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543266",
    description:
      "Specialist in braces, aligners, and teeth whitening. Digital dentistry with latest technology.",
    image: "https://picsum.photos/400/300?random=615",
  },
  {
    name: "Family Dental Center",
    ownerName: "Dr. Priya Desai",
    category: "Dentists",
    location: "Bandra West, Mumbai",
    phone: "+91 9876543267",
    description:
      "Gentle dental care for all ages. Preventive dentistry, fillings, and pediatric dental services.",
    image: "https://picsum.photos/400/300?random=625",
  },

  // Loans
  {
    name: "Quick Finance Solutions",
    ownerName: "Vikas Agarwal",
    category: "Loans",
    location: "Connaught Place, Delhi",
    phone: "+91 9876543268",
    description:
      "Personal loans, home loans, and business loans with minimal documentation. Quick approval within 24 hours.",
    image: "https://picsum.photos/400/300?random=637",
  },
  {
    name: "Easy Home Loans",
    ownerName: "Sunita Mehta",
    category: "Loans",
    location: "Viman Nagar, Pune",
    phone: "+91 9876543269",
    description:
      "Specialized in home loans and property loans. Competitive interest rates and flexible repayment options.",
    image: "https://picsum.photos/400/300?random=647",
  },
  {
    name: "Business Growth Capital",
    ownerName: "Rajiv Singh",
    category: "Loans",
    location: "MG Road, Bangalore",
    phone: "+91 9876543270",
    description:
      "Business loans and working capital for startups and SMEs. Expert financial consultation included.",
    image: "https://picsum.photos/400/300?random=657",
  },

  // Event Organisers
  {
    name: "Celebration Events",
    ownerName: "Neha Kapoor",
    category: "Event Organisers",
    location: "Juhu, Mumbai",
    phone: "+91 9876543271",
    description:
      "Corporate events, birthday parties, and anniversary celebrations. Complete event management with decoration.",
    image: "https://picsum.photos/400/300?random=669",
  },
  {
    name: "Grand Occasions",
    ownerName: "Karan Bhatia",
    category: "Event Organisers",
    location: "Sector 29, Gurgaon",
    phone: "+91 9876543272",
    description:
      "Professional event planners for conferences, product launches, and exhibitions. Audio-visual support available.",
    image: "https://picsum.photos/400/300?random=679",
  },
  {
    name: "Kids Party Planners",
    ownerName: "Priya Sharma",
    category: "Event Organisers",
    location: "Koramangala, Bangalore",
    phone: "+91 9876543273",
    description:
      "Specialized in children's birthday parties with themes, entertainment, and games. Make your kid's day memorable!",
    image: "https://picsum.photos/400/300?random=689",
  },

  // Driving Schools
  {
    name: "Drive Safe Academy",
    ownerName: "Ramesh Kumar",
    category: "Driving Schools",
    location: "Patel Nagar, Delhi",
    phone: "+91 9876543274",
    description:
      "Professional driving training for car and two-wheeler with experienced instructors. License assistance provided.",
    image: "https://picsum.photos/400/300?random=701",
  },
  {
    name: "Expert Motor Training",
    ownerName: "Sunil Verma",
    category: "Driving Schools",
    location: "Aundh, Pune",
    phone: "+91 9876543275",
    description:
      "Comprehensive driving courses including defensive driving and highway training. Female instructors available.",
    image: "https://picsum.photos/400/300?random=711",
  },
  {
    name: "Quick Learn Driving",
    ownerName: "Anjali Desai",
    category: "Driving Schools",
    location: "Jayanagar, Bangalore",
    phone: "+91 9876543276",
    description:
      "Fast-track driving lessons with flexible timings. Home pickup facility and modern training vehicles.",
    image: "https://picsum.photos/400/300?random=721",
  },

  // Packers & Movers
  {
    name: "Safe Move Packers",
    ownerName: "Deepak Gupta",
    category: "Packers & Movers",
    location: "Sector 18, Noida",
    phone: "+91 9876543277",
    description:
      "Reliable packing and moving services for home and office relocation. Insurance coverage available.",
    image: "https://picsum.photos/400/300?random=733",
  },
  {
    name: "Express Relocations",
    ownerName: "Vikram Singh",
    category: "Packers & Movers",
    location: "Whitefield, Bangalore",
    phone: "+91 9876543278",
    description:
      "Professional moving company with trained staff and quality packing materials. Door-to-door service.",
    image: "https://picsum.photos/400/300?random=743",
  },
  {
    name: "City to City Movers",
    ownerName: "Amit Joshi",
    category: "Packers & Movers",
    location: "Andheri East, Mumbai",
    phone: "+91 9876543279",
    description:
      "Interstate moving specialists with vehicle transportation. Secure storage facilities available.",
    image: "https://picsum.photos/400/300?random=753",
  },

  // Courier Service
  {
    name: "Speed Courier Services",
    ownerName: "Rahul Mehta",
    category: "Courier Service",
    location: "Connaught Place, Delhi",
    phone: "+91 9876543280",
    description:
      "Same-day delivery service for documents and parcels. Domestic and international courier available.",
    image: "https://picsum.photos/400/300?random=765",
  },
  {
    name: "Express Delivery Hub",
    ownerName: "Sanjay Kumar",
    category: "Courier Service",
    location: "MG Road, Pune",
    phone: "+91 9876543281",
    description:
      "Fast and reliable courier service with online tracking. Affordable rates for bulk shipments.",
    image: "https://picsum.photos/400/300?random=775",
  },
  {
    name: "QuickShip Logistics",
    ownerName: "Priya Reddy",
    category: "Courier Service",
    location: "Indiranagar, Bangalore",
    phone: "+91 9876543282",
    description:
      "E-commerce shipping partner with cash-on-delivery facility. Reverse pickup and return management.",
    image: "https://picsum.photos/400/300?random=785",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Get or create a default business owner user
    let businessOwner = await User.findOne({ email: "businessowner@test.com" });

    if (!businessOwner) {
      businessOwner = await User.create({
        name: "Business Owner",
        email: "businessowner@test.com",
        password: "password123",
        phone: "+91 9999999999",
        role: "business_owner",
      });
      console.log("Default business owner created");
    }

    // Clear existing businesses
    await Business.deleteMany({});
    console.log("Cleared existing businesses");

    // Add userId to all businesses
    const businessesWithUser = sampleBusinesses.map((business) => ({
      ...business,
      userId: businessOwner._id,
    }));

    // Insert sample businesses
    await Business.insertMany(businessesWithUser);
    console.log(
      `Successfully added ${sampleBusinesses.length} sample businesses!`,
    );

    // Count businesses by category
    const categories = [
      "Restaurant",
      "Hotels",
      "Beauty Spa",
      "Home Decor",
      "Wedding Planning",
      "Education",
      "Rent & Hire",
      "Hospitals",
      "Contractors",
      "Pet Shops",
      "PG/Hostels",
      "Estate Agent",
      "Dentists",
      "Gym",
      "Loans",
      "Event Organisers",
      "Driving Schools",
      "Packers & Movers",
      "Courier Service",
      "Electronics",
      "Salon",
      "Grocery",
      "Pharmacy",
      "Clothing",
    ];
    console.log("\nBusinesses per category:");
    for (const category of categories) {
      const count = await Business.countDocuments({ category });
      console.log(`${category}: ${count}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();




