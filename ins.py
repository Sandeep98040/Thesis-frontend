# from pymongo import MongoClient

# # MongoDB connection string
# connection_string = "mongodb://localhost:27017/"

# # Connect to MongoDB
# client = MongoClient(connection_string)

# # Select the database
# db = client.course_selection

# # Select the collection
# contents_collection = db.contents

# # Document to be inserted
# document = {
#     "course": "Machine Learning",
#     "content": """Title: Introduction to ML
# Body:
# A computer network is a collection of interconnected devices that can communicate and share resources with each other. These devices, known as nodes, include computers, servers, networking hardware, and other devices. Networks enable data sharing, resource sharing, and communication among devices in a seamless and efficient manner.

# Types of Computer Networks
# Local Area Network (LAN)

# Scope: Covers a small geographical area, such as a home, school, or office building.
# Characteristics: High-speed, low-latency connections.
# Example: A network in a school computer lab.
# Wide Area Network (WAN)

# Scope: Covers a large geographical area, such as a city, country, or even continents.
# Characteristics: Connects multiple LANs, often using leased telecommunication lines.
# Example: The internet, which connects multiple LANs and WANs worldwide.
# Metropolitan Area Network (MAN)

# Scope: Covers a larger geographical area than a LAN but smaller than a WAN, such as a city.
# Characteristics: Connects multiple LANs within a city.
# Example: A network connecting different branches of a city’s public library system.
# Personal Area Network (PAN)

# Scope: Covers a very small area, typically within a range of a few meters.
# Characteristics: Used for connecting personal devices.
# Example: Bluetooth connections between a smartphone and a headset.
# Virtual Private Network (VPN)

# Scope: Extends a private network across a public network.
# Characteristics: Provides secure remote access to an organization’s network.
# Example: Employees accessing their company’s internal network from home.
# Network Topologies
# Bus Topology

# Description: All devices are connected to a single central cable, called a bus.
# Advantages: Easy to install and cost-effective for small networks.
# Disadvantages: Difficult to troubleshoot and not scalable.
# Star Topology

# Description: All devices are connected to a central hub or switch.
# Advantages: Easy to install and manage; failure of one device does not affect the rest.
# Disadvantages: If the central hub fails, the whole network goes down.
# Ring Topology

# Description: Devices are connected in a circular fashion, with each device connected to two other devices.
# Advantages: Data packets travel in one direction, reducing the chance of collisions.
# Disadvantages: Failure of a single device can disrupt the entire network.
# Mesh Topology

# Description: Devices are interconnected, with multiple paths for data to travel.
# Advantages: Highly reliable and robust; failure of one device does not affect the network.
# Disadvantages: Expensive and complex to install and maintain.
# Hybrid Topology

# Description: Combines two or more different types of topologies.
# Advantages: Flexible and scalable.
# Disadvantages: Complexity in design and maintenance.
# Networking Devices
# Router

# Function: Connects multiple networks and directs data packets between them.
# Example: A home router connecting a local network to the internet.
# Switch

# Function: Connects devices within a LAN and forwards data based on MAC addresses.
# Example: A switch connecting computers in a school lab.
# Hub

# Function: Connects multiple devices in a LAN and broadcasts data to all devices.
# Example: An outdated networking device replaced by switches in modern networks.
# Modem

# Function: Converts digital data to analog signals and vice versa for transmission over phone lines.
# Example: A device used for DSL internet connections.
# Access Point

# Function: Allows wireless devices to connect to a wired network.
# Example: Wi-Fi access points in a school campus.
# Network Protocols
# TCP/IP (Transmission Control Protocol/Internet Protocol)

# Function: Governs the connection and communication between devices on the internet.
# Example: The foundational protocol suite for the internet.
# HTTP/HTTPS (HyperText Transfer Protocol/Secure)

# Function: Used for transferring web pages on the internet.
# Example: Browsing websites.
# FTP (File Transfer Protocol)

# Function: Used for transferring files between computers.
# Example: Uploading files to a web server.
# SMTP (Simple Mail Transfer Protocol)

# Function: Used for sending emails.
# Example: Sending an email through an email client.
# DNS (Domain Name System)

# Function: Translates domain names to IP addresses.
# Example: Converting www.example.com to 192.168.1.1.
# Network Security
# Firewalls

# Function: Monitor and control incoming and outgoing network traffic based on security rules.
# Example: A hardware or software firewall protecting a home network.
# Encryption

# Function: Converts data into a coded form to prevent unauthorized access.
# Example: SSL/TLS encryption for secure web browsing.
# Antivirus Software

# Function: Detects and removes malicious software from computers and networks.
# Example: Software like Norton, McAfee, or Windows Defender.
# Intrusion Detection Systems (IDS)

# Function: Monitors network traffic for suspicious activity.
# Example: Software that alerts administrators of potential security breaches.
# Virtual Private Networks (VPNs)

# Function: Provides secure remote access to a network.
# Example: Employees accessing their company's network from home securely.
# Conclusion
# Computer networks are essential for modern communication and data sharing. Understanding the types of networks, their topologies, networking devices, protocols, and security measures is crucial for anyone studying computer science or IT. Networks form the backbone of the internet and many other technologies we rely on daily.

# Additional Topics for Further Study
# Network Addressing and Subnetting
# Wireless Networking (Wi-Fi)
# Network Troubleshooting Tools
# Cloud Networking
# Future Trends in Networking (e.g., 5G, Internet of Things)
# """
# }
# # Insert the document into the collection
# result = contents_collection.insert_one(document)

# print("Document inserted with _id:", result.inserted_id)
from pymongo import MongoClient

# MongoDB connection string
connection_string = "mongodb://localhost:27017/"

# Connect to MongoDB
client = MongoClient(connection_string)

# Select the database
db = client.course_selection

# Select the collection
contents_collection = db.contents

# Document to be inserted
document = {
    "course": "Cybersecurity",
    "content": """
### Title: Introduction to Cybersecurity

#### Body:
Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.

#### Definition of Cybersecurity
Cybersecurity involves the implementation of technologies, processes, and controls to protect systems, networks, programs, devices, and data from cyberattacks. It aims to reduce the risk of cyberattacks and protect against the unauthorized exploitation of systems, networks, and technologies.

#### Key Concepts in Cybersecurity
**Threats**
- **Description:** Potential causes of an unwanted impact to a system or organization.
- **Types:** Malware, phishing, ransomware, insider threats, denial-of-service (DoS) attacks.
- **Goals:** Understanding and identifying potential threats to implement effective defenses.

**Vulnerabilities**
- **Description:** Weaknesses in a system that can be exploited by threats to gain unauthorized access.
- **Examples:** Software bugs, misconfigurations, lack of encryption, weak passwords.
- **Goals:** Identifying and mitigating vulnerabilities to prevent exploitation.

**Risk Management**
- **Description:** The process of identifying, assessing, and controlling risks to an organization’s information assets.
- **Components:** Risk assessment, risk mitigation, risk monitoring.
- **Goals:** Minimizing the impact of cybersecurity incidents on an organization.

**Encryption**
- **Description:** The process of converting data into a coded format to prevent unauthorized access.
- **Types:** Symmetric encryption, asymmetric encryption, hashing.
- **Goals:** Ensuring data confidentiality and integrity.

**Access Control**
- **Description:** Mechanisms that restrict access to information resources to authorized users.
- **Types:** Authentication, authorization, role-based access control (RBAC).
- **Goals:** Preventing unauthorized access to sensitive information.

#### Cybersecurity Technologies
**Firewalls**
- **Description:** Network security devices that monitor and control incoming and outgoing network traffic based on predetermined security rules.
- **Types:** Hardware firewalls, software firewalls, next-generation firewalls (NGFW).
- **Benefits:** Protects against unauthorized access, blocks malicious traffic.

**Intrusion Detection Systems (IDS)**
- **Description:** Systems that monitor network traffic for suspicious activity and potential threats.
- **Types:** Network-based IDS (NIDS), host-based IDS (HIDS).
- **Benefits:** Detects and alerts on potential security breaches.

**Antivirus Software**
- **Description:** Programs designed to detect, prevent, and remove malware.
- **Features:** Real-time scanning, automatic updates, quarantine of infected files.
- **Benefits:** Protects systems from a wide range of malware threats.

**Security Information and Event Management (SIEM)**
- **Description:** Systems that provide real-time analysis of security alerts generated by applications and network hardware.
- **Components:** Log management, event correlation, incident response.
- **Benefits:** Centralizes security monitoring, enhances threat detection and response.

#### Cybersecurity Best Practices
**Regular Software Updates**
- Ensures that systems are protected against known vulnerabilities.
- Keeps software and applications up to date with the latest security patches.

**Strong Passwords and Multi-Factor Authentication (MFA)**
- Enhances security by requiring complex passwords and additional verification steps.
- Reduces the risk of unauthorized access.

**Security Awareness Training**
- Educates employees about cybersecurity threats and best practices.
- Helps in identifying and preventing social engineering attacks.

**Data Backup and Recovery**
- Ensures that data can be restored in the event of a cyberattack or system failure.
- Regularly backs up important data and tests recovery procedures.

### Conclusion
Cybersecurity is essential for protecting information systems and data from cyber threats. Understanding its key concepts, technologies, and best practices is crucial for mitigating risks and ensuring the security and integrity of information.

### Additional Topics for Further Study
- Advanced Persistent Threats (APT)
- Cybersecurity Frameworks and Standards (e.g., NIST, ISO/IEC 27001)
- Incident Response and Forensics
- Future Trends in Cybersecurity
"""
}
# Insert the document into the collection
result = contents_collection.insert_one(document)

print("Document inserted with _id:", result.inserted_id)
