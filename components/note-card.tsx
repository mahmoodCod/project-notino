"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star, Download, Eye, ThumbsUp, MessageCircle } from "lucide-react"

interface NoteCardProps {
  note: {
    id: string
    title: string
    description: string
    author: {
      name: string
      avatar: string
      university: string
    }
    course: string
    professor: string
    rating: number
    downloads: number
    views: number
    likes: number
    uploadDate: string
    tags: string[]
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/note/${note.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out border-2 hover:border-primary/30 hover:-translate-y-0.5 transform-gpu cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 leading-tight text-balance text-foreground group-hover:text-primary transition-colors duration-200">
                {note.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2 group-hover:text-muted-foreground">
                {note.description}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2.5 py-1.5 rounded-lg shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{note.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3 flex-1">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-3 p-2.5 bg-muted/50 rounded-lg transition-colors duration-200 hover:bg-muted/70">
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarImage src={note.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">{note.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm text-foreground group-hover:text-foreground">{note.author.name}</p>
              <p className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground">{note.author.university}</p>
            </div>
          </div>

          {/* Course & Professor */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground text-xs group-hover:text-muted-foreground">درس:</span>
              <span className="font-medium text-foreground group-hover:text-foreground">{note.course}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground text-xs group-hover:text-muted-foreground">استاد:</span>
              <span className="font-medium text-foreground group-hover:text-foreground">{note.professor}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-3 border-t">
          {/* Stats */}
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground group-hover:text-muted-foreground">
            <div className="flex items-center gap-1 transition-colors duration-200">
              <Download className="w-3.5 h-3.5" />
              <span>{note.downloads.toLocaleString("fa-IR")}</span>
            </div>
            <div className="flex items-center gap-1 transition-colors duration-200">
              <Eye className="w-3.5 h-3.5" />
              <span>{note.views.toLocaleString("fa-IR")}</span>
            </div>
            <div className="flex items-center gap-1 transition-colors duration-200">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{note.likes.toLocaleString("fa-IR")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5 bg-transparent transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 hover:text-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-xs text-foreground">نظرات</span>
            </Button>
            <Button
              size="sm"
              className="flex-1 gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={(e) => e.preventDefault()}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-xs">دانلود</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
