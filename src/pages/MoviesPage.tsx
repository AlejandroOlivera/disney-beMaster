import { ContentDetails } from "@/components/ContentDetails"
import { Movies } from "@/interfaces/Movies"
import { MoviesSections } from "@/sections/Movies/Movies"
import { NavBar } from "@/sections/Navbar"
import { useState } from "react"

export const MoviesPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null)

  const openModal = (movie: Movies) => {
    setSelectedMovie(movie)
    const modal = document.getElementById("my_modal_2")
    if (modal) modal.showModal()
  }

  return (
    <>
      <NavBar />
      <MoviesSections openModal={openModal} />
      <ContentDetails selectedMovie={selectedMovie} />
    </>
  )
}
