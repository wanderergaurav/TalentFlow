import { Skeleton } from "@/components/ui/skeleton"

export function JobCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export function CandidateCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
      </div>
      
      <div className="mb-4">
        <Skeleton className="h-4 w-16 mb-2" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
      </div>
      
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export function AssessmentCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      <Skeleton className="h-8 w-28" />
    </div>
  )
}

export function JobsListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CandidatesListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CandidateCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function AssessmentsListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <AssessmentCardSkeleton key={i} />
      ))}
    </div>
  )
}