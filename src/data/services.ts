export const majorServices = [
  { title: "Mechanical Parts & Components", text: "Machinery spares, bearings, gears, shafts, couplings and mechanical assemblies sourced against your technical requirements." },
  { title: "Electrical Components", text: "Switches, relays, power supplies, circuit protection, cabling and control components for industrial applications." },
  { title: "Electronic Parts", text: "Semiconductors, sensors, connectors, electronic components and subassemblies for technical and production requirements." },
  { title: "Industrial / Aerospace Materials", text: "Industrial raw materials, engineering materials and specialised aerospace materials sourced to the required specification." },
  { title: "Industrial Chemicals", text: "Industrial and technical chemicals, adhesives, sealants and bonding solutions selected for your application." },
  { title: "Industrial Computing & IT Services", text: "Industrial Panel PCs, SBCs, rugged laptops, computer accessories and IT specialist services for business and industrial environments." },
  { title: "PCB & BOM Solutions", text: "BOM management and turnkey coordination for PCB manufacturing, component sourcing and PCB assembly (stuffing)." },
  { title: "Environmental Testing", text: "Coordination of environmental testing requirements, test providers and documentation against your specified conditions." },
] as const;

export const serviceGroups = [
  { title: "Mechanical Parts & Components", text: "Specification-driven sourcing for maintenance, equipment integration and project procurement.", items: ["Mechanical parts and replacement components", "Machinery parts, bearings, gears, shafts and fasteners", "Couplings, seals and drive assemblies", "Hydraulic and pneumatic components"] },
  { title: "Electrical Components", text: "Electrical items for industrial equipment, power distribution and control applications.", items: ["Switches, relays and circuit protection", "Power supplies, cables and connectors", "Industrial control components and related accessories"] },
  { title: "Electronic Parts", text: "Electronic components and subassemblies matched to technical specifications and availability.", items: ["Semiconductors and circuit-board components", "Sensors, connectors and electronic subassemblies", "Component sourcing for production and replacement requirements"] },
  { title: "Industrial / Aerospace Materials", text: "Sourcing support for industrial, engineering and aerospace material requirements.", items: ["Industrial raw materials and engineering materials", "Specialised aerospace materials", "Specification and available material documentation coordination"] },
  { title: "Industrial Chemicals", text: "Application-based sourcing of industrial chemicals and technical consumables.", items: ["Industrial and technical chemicals", "Industrial adhesives, sealants and bonding agents", "Available safety data and handling documentation coordination"] },
  { title: "Industrial Computing", text: "Industrial computing hardware selected against operating conditions, interfaces and system requirements.", items: ["Industrial Panel PCs", "Single-board computers (SBCs)", "Rugged laptops", "Industrial IT hardware and related accessories"] },
  { title: "Computer Accessories & IT Specialist Services", text: "We offer IT specialist services alongside general computer accessories and hardware sourcing for offices, workshops and industrial environments.", items: ["Computer peripherals, storage and accessories", "Networking hardware, servers and related equipment", "IT equipment selection and configuration support", "Technical coordination for computer and network requirements"] },
  { title: "BOM Management", text: "Bill of materials support to coordinate component requirements, sourcing and procurement.", items: ["BOM review and component identification", "Supplier availability and quotation coordination", "Alternative component options for customer technical approval"] },
  { title: "Turnkey PCB Manufacturing & Assembly", text: "Turnkey solutions coordinated with manufacturing and assembly partners against your approved design and requirements.", items: ["PCB manufacturing coordination", "Electronic component procurement", "PCB assembly and stuffing", "Production requirements and available quality documentation coordination"] },
  { title: "Environmental Testing", text: "Coordination of environmental testing through suitable providers according to your product requirements and agreed test plan.", items: ["Review of specified environmental conditions", "Testing provider and quotation coordination", "Scheduling and available test report follow-up"] },
  { title: "Surveillance Cameras", text: "Surveillance equipment and accessories for business and industrial facilities.", items: ["CCTV and IP cameras", "DVR and NVR equipment", "Surveillance cabling and accessories"] },
  { title: "Sourcing, Supply & Technical Support", text: "Procurement support from enquiry review through supplier coordination and delivery follow-up.", items: ["Global sourcing and indenting", "Quotation, lead-time and logistics coordination", "Available certificates and product documentation", "Technical clarification and after-sales coordination"] },
] as const;

export const serviceOptions = [
  "Mechanical Parts", "Mechanical Components", "Machinery Parts",
  "Electrical Components", "Electronic Parts", "Industrial / Aerospace Materials",
  "Industrial Chemicals", "Industrial Panel PCs", "Single-Board Computers (SBCs)",
  "Rugged Laptops", "Computer Accessories", "IT Specialist Services",
  "BOM Management", "Turnkey PCB Manufacturing & Assembly", "Environmental Testing",
  "Surveillance Cameras", "Global Sourcing & Procurement", "Other",
] as const;
