import { ContentCategory } from "@/components/ContentCategory"
import { Movies } from "@/interfaces/Movies"
import { client } from "@/supabase/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface IMoviesSections {
  openModal: (movie: Movies) => void
}

export const MoviesSections: React.FC<IMoviesSections> = ({ openModal }) => {
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
        console.error("Error fetching movies by category:", error)
      }
    }

    fetchMoviesByCategory()
  }, [categoryId])
  return (
    <div className="flex gap-3  flex-wrap p-8 w-full">
      {movies &&
        movies.map((movie) => (
          <ContentCategory
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            openModal={openModal}
          />
        ))}
    </div>
  )
}
