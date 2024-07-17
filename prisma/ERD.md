```mermaid
erDiagram

  "User" {
    Int id "🗝️"
    String email 
    String name "❓"
    }
  

  "Post" {
    Int id "🗝️"
    String title 
    String content "❓"
    Boolean published 
    Int authorId 
    Int categoryId 
    }
  

  "Comment" {
    Int id "🗝️"
    String handleName 
    String content "❓"
    Int postId 
    }
  

  "Category" {
    Int id "🗝️"
    String name 
    }
  
    "User" o{--}o "Post" : "posts"
    "Post" o|--|| "User" : "author"
    "Post" o{--}o "Comment" : "comments"
    "Post" o|--|| "Category" : "categories"
    "Comment" o|--|| "Post" : "posts"
    "Category" o{--}o "Post" : "posts"
```
