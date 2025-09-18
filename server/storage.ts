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
