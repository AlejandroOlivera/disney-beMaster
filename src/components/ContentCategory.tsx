import { Link } from "react-router-dom"

interface IContentCategory {
  id: number
  name: string
  movieCount: number
}

export const ContentCategory: React.FC<IContentCategory> = ({
  id,
  name,
  movieCount,
}) => {
  return (
    <div className="card w-64 bg-base-100 shadow-xl" key={id}>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <Link className="btn" to={`/categories/${id}`}>
            View Movies
          </Link>
          <button className="btn btn-primary">{movieCount}</button>
        </div>
      </div>
    </div>
  )
}
