import { type User, type InsertUser, type Job, type InsertJob, type Candidate, type InsertCandidate, type Assessment, type InsertAssessment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;
  
  getAllCandidates(): Promise<Candidate[]>;
  getCandidate(id: string): Promise<Candidate | undefined>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  updateCandidate(id: string, candidate: Partial<InsertCandidate>): Promise<Candidate | undefined>;
  deleteCandidate(id: string): Promise<boolean>;
  
  getAllAssessments(): Promise<Assessment[]>;
  getAssessment(id: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: string, assessment: Partial<InsertAssessment>): Promise<Assessment | undefined>;
  deleteAssessment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;
  private candidates: Map<string, Candidate>;
  private assessments: Map<string, Assessment>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.candidates = new Map();
    this.assessments = new Map();
    this.seedData();
  }

  private seedData() {
    // Sample Jobs
    const sampleJobs = [
      {
        name: "Senior React Developer",
        mode: "Remote",
        type: "Full-time",
        exp: "5+ years",
        status: "Open",
        description: "We're looking for an experienced React developer to join our growing team. You'll be working on cutting-edge web applications using modern technologies like React, TypeScript, and Next.js."
      },
      {
        name: "Product Designer",
        mode: "Hybrid",
        type: "Full-time", 
        exp: "3+ years",
        status: "Open",
        description: "Join our design team to create beautiful, user-centered products. Experience with Figma, design systems, and user research required."
      },
      {
        name: "DevOps Engineer",
        mode: "On-site",
        type: "Contract",
        exp: "4+ years",
        status: "Archived",
        description: "Help us scale our infrastructure with AWS, Docker, and Kubernetes. Looking for someone with strong automation and monitoring skills."
      },
      {
        name: "Data Scientist",
        mode: "Remote",
        type: "Full-time",
        exp: "2+ years",
        status: "Open",
        description: "Analyze large datasets and build machine learning models to drive business insights. Python, SQL, and statistical analysis experience required."
      },
      {
        name: "Mobile App Developer",
        mode: "Hybrid",
        type: "Part-time",
        exp: "3+ years",
        status: "Open",
        description: "Develop cross-platform mobile applications using React Native. Experience with native iOS/Android development is a plus."
      }
    ];

    sampleJobs.forEach(jobData => {
      const id = randomUUID();
      const job: Job = {
        ...jobData,
        id,
        description: jobData.description || null,
        createdAt: new Date()
      };
      this.jobs.set(id, job);
    });

    // Sample Candidates
    const sampleCandidates = [
      {
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        phone: "+1 (555) 123-4567",
        position: "Frontend Developer",
        experience: "5 years of experience building modern web applications with React, Vue.js, and TypeScript. Led frontend development for multiple successful products.",
        skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Vue.js", "Node.js"],
        status: "Active"
      },
      {
        name: "Marcus Johnson",
        email: "marcus.j@email.com",
        phone: "+1 (555) 234-5678",
        position: "UX/UI Designer",
        experience: "4 years specializing in user experience design and interface development. Strong background in user research and design systems.",
        skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
        status: "Active"
      },
      {
        name: "Elena Rodriguez",
        email: "elena.rodriguez@email.com",
        phone: "+1 (555) 345-6789",
        position: "Data Analyst",
        experience: "3 years analyzing business data and creating insights. Proficient in SQL, Python, and data visualization tools.",
        skills: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Statistics", "Machine Learning"],
        status: "Active"
      },
      {
        name: "David Kim",
        email: "david.kim@email.com",
        phone: null,
        position: "Backend Engineer",
        experience: "6 years developing scalable backend systems and APIs. Experience with microservices architecture and cloud platforms.",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
        status: "Active"
      },
      {
        name: "Amanda Foster",
        email: "amanda.foster@email.com",
        phone: "+1 (555) 456-7890",
        position: "Product Manager",
        experience: "4 years leading product development from conception to launch. Strong analytical and communication skills.",
        skills: ["Product Strategy", "Analytics", "Agile", "Scrum", "User Research", "Roadmapping"],
        status: "Active"
      },
      {
        name: "James Wilson",
        email: "james.wilson@email.com",
        phone: "+1 (555) 567-8901",
        position: "DevOps Engineer",
        experience: "5 years building and maintaining CI/CD pipelines and cloud infrastructure.",
        skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Monitoring", "Linux"],
        status: "Inactive"
      }
    ];

    sampleCandidates.forEach(candidateData => {
      const id = randomUUID();
      const candidate: Candidate = {
        ...candidateData,
        id,
        phone: candidateData.phone || null,
        position: candidateData.position || null,
        experience: candidateData.experience || null,
        skills: candidateData.skills || null,
        status: candidateData.status || "Active",
        createdAt: new Date()
      };
      this.candidates.set(id, candidate);
    });

    // Sample Assessments
    const jobIds = Array.from(this.jobs.keys());
    const candidateIds = Array.from(this.candidates.keys());
    
    if (jobIds.length > 0 && candidateIds.length > 0) {
      const sampleAssessments = [
        {
          candidateId: candidateIds[0],
          jobId: jobIds[0],
          title: "Technical Interview - React Skills",
          type: "Technical",
          status: "Completed",
          score: 85,
          notes: "Strong performance in React concepts, clean code implementation."
        },
        {
          candidateId: candidateIds[1],
          jobId: jobIds[1],
          title: "Design Portfolio Review",
          type: "Portfolio Review",
          status: "Completed",
          score: 92,
          notes: "Excellent design sense and user-centered approach."
        },
        {
          candidateId: candidateIds[2],
          jobId: jobIds[3],
          title: "Data Analysis Challenge",
          type: "Technical",
          status: "In Progress",
          score: null,
          notes: "Currently working on SQL optimization tasks."
        },
        {
          candidateId: candidateIds[3],
          jobId: jobIds[0],
          title: "System Design Interview",
          type: "Technical",
          status: "Pending",
          score: null,
          notes: null
        }
      ];

      sampleAssessments.forEach(assessmentData => {
        const id = randomUUID();
        const assessment: Assessment = {
          ...assessmentData,
          id,
          candidateId: assessmentData.candidateId || null,
          jobId: assessmentData.jobId || null,
          score: assessmentData.score || null,
          notes: assessmentData.notes || null,
          createdAt: new Date()
        };
        this.assessments.set(id, assessment);
      });
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = { 
      ...insertJob,
      id, 
      status: insertJob.status || "Open",
      description: insertJob.description || null,
      createdAt: new Date() 
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: string, jobUpdate: Partial<InsertJob>): Promise<Job | undefined> {
    const existingJob = this.jobs.get(id);
    if (!existingJob) return undefined;
    
    const updatedJob = { ...existingJob, ...jobUpdate };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  async getAllCandidates(): Promise<Candidate[]> {
    return Array.from(this.candidates.values());
  }

  async getCandidate(id: string): Promise<Candidate | undefined> {
    return this.candidates.get(id);
  }

  async createCandidate(insertCandidate: InsertCandidate): Promise<Candidate> {
    const id = randomUUID();
    const candidate: Candidate = { 
      ...insertCandidate,
      id,
      phone: insertCandidate.phone || null,
      position: insertCandidate.position || null,
      experience: insertCandidate.experience || null,
      skills: insertCandidate.skills || null,
      status: insertCandidate.status || "Active",
      createdAt: new Date() 
    };
    this.candidates.set(id, candidate);
    return candidate;
  }

  async updateCandidate(id: string, candidateUpdate: Partial<InsertCandidate>): Promise<Candidate | undefined> {
    const existingCandidate = this.candidates.get(id);
    if (!existingCandidate) return undefined;
    
    const updatedCandidate = { ...existingCandidate, ...candidateUpdate };
    this.candidates.set(id, updatedCandidate);
    return updatedCandidate;
  }

  async deleteCandidate(id: string): Promise<boolean> {
    return this.candidates.delete(id);
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = { 
      ...insertAssessment,
      id,
      status: insertAssessment.status || "Pending",
      candidateId: insertAssessment.candidateId || null,
      jobId: insertAssessment.jobId || null,
      score: insertAssessment.score || null,
      notes: insertAssessment.notes || null,
      createdAt: new Date() 
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async updateAssessment(id: string, assessmentUpdate: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const existingAssessment = this.assessments.get(id);
    if (!existingAssessment) return undefined;
    
    const updatedAssessment = { ...existingAssessment, ...assessmentUpdate };
    this.assessments.set(id, updatedAssessment);
    return updatedAssessment;
  }

  async deleteAssessment(id: string): Promise<boolean> {
    return this.assessments.delete(id);
  }
}

export const storage = new MemStorage();
