import { ContentDetails } from "@/components/ContentDetails"
import { Movies } from "@/interfaces/Movies"
import { client } from "@/supabase/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const MoviesSections = () => {
  const { categoryId } = useParams()
  const [movies, setMovies] = useState<readonly Movies[]>([])

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const { data, error } = await client
          .from("movies")
          .select("*")
          .eq("category_id", categoryId)

        if (error) {
          throw error
        }
        setMovies(data)
      } catch (error) {
        console.error("Error fetching movies by category:", error.message)
      }
    }

    fetchMoviesByCategory()
  }, [categoryId])
  return (
    <div className="flex gap-3  flex-wrap p-8">
      {movies &&
        movies.map((movie) => (
          <ContentDetails
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
          />
        ))}
    </div>
  )
}
