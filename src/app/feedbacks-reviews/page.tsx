"use client";

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

interface Feedback {
  id: number;
  author: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  reply?: string;
  isReplyEditing?: boolean; // New state for editing reply
}

const MOCK_FEEDBACK: Feedback[] = [
  {
    id: 1,
    author: "Alice Smith",
    avatarUrl: "https://picsum.photos/id/1/50/50",
    comment: "Great service! Fast and reliable.",
    rating: 5,
    reply: "Thank you for your kind words, Alice!",
    isReplyEditing: false,
  },
  {
    id: 2,
    author: "Bob Johnson",
    avatarUrl: "https://picsum.photos/id/2/50/50",
    comment: "The delivery was a bit late, but the package arrived in good condition.",
    rating: 3,
    reply: "Thank you",
    isReplyEditing: false,
  },
  {
    id: 3,
    author: "Charlie Brown",
    avatarUrl: "https://picsum.photos/id/3/50/50",
    comment: "Excellent communication and very professional.",
    rating: 4,
    reply: "We appreciate your feedback!",
    isReplyEditing: false,
  },
  {
    id: 4,
    author: "Diana Lee",
    avatarUrl: "https://picsum.photos/id/4/50/50",
    comment: "The driver was very polite and helpful.",
    rating: 5,
    reply: "Glad to hear that!",
    isReplyEditing: false,
  },
  {
    id: 5,
    author: "Ethan White",
    avatarUrl: "https://picsum.photos/id/5/50/50",
    comment: "Could be faster, but overall satisfied.",
    rating: 3,
    reply: "We are working on improving our speed.",
    isReplyEditing: false,
  },
  {
    id: 6,
    author: "Fiona Green",
    avatarUrl: "https://picsum.photos/id/6/50/50",
    comment: "Best delivery service I have ever used!",
    rating: 5,
    reply: "Thank you!",
    isReplyEditing: false,
  },
];

export default function FeedbacksReviewsPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(MOCK_FEEDBACK);
  const [replyText, setReplyText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const startReply = (id: number) => {
    setReplyingTo(id);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const saveReply = (id: number) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, reply: replyText, isReplyEditing: false } : feedback
      )
    );
    setReplyingTo(null);
    setReplyText("");
  };

  const startEditReply = (id: number) => {
    const feedbackToEdit = feedbacks.find(feedback => feedback.id === id);
    if (feedbackToEdit) {
      setReplyingTo(id);
      setReplyText(feedbackToEdit.reply || "");
      setFeedbacks(feedbacks.map(fb =>
        fb.id === id ? { ...fb, isReplyEditing: true } : fb
      ));
    }
  };

  const cancelEditReply = (id: number) => {
    setFeedbacks(feedbacks.map(fb =>
      fb.id === id ? { ...fb, isReplyEditing: false } : fb
    ));
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Feedbacks and Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 space-x-4">
              <Avatar>
                <AvatarImage src={feedback.avatarUrl} alt={feedback.author} />
                <AvatarFallback>{feedback.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle>{feedback.author}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Rating: {"⭐".repeat(feedback.rating)}
              </div>
              <p className="text-sm">{feedback.comment}</p>

              {feedback.reply ? (
                <div className="mt-4">
                  <Label className="text-xs">Reply:</Label>
                  {feedback.isReplyEditing ? (
                    <div className="mt-2">
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="secondary" size="sm" onClick={() => cancelEditReply(feedback.id)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => saveReply(feedback.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{feedback.reply}</p>
                      <Button variant="outline" size="sm" onClick={() => startEditReply(feedback.id)}>
                         <Edit className="h-4 w-4 mr-2" /> Edit Reply
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                replyingTo === feedback.id ? (
                  <div className="mt-4">
                    <Label htmlFor={`reply-${feedback.id}`} className="text-xs">
                      Your Reply:
                    </Label>
                    <Textarea
                      id={`reply-${feedback.id}`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="secondary" size="sm" onClick={cancelReply}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveReply(feedback.id)}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => startReply(feedback.id)}>
                    Reply
                  </Button>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
