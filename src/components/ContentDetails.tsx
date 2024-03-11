import { Movies } from "@/interfaces/Movies"

export const ContentDetails: React.FC<Movies> = ({
  description,
  id,
  title,
}) => {
  return (
    <div className="card w-64 bg-base-100 shadow-xl" key={id}>
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  )
}
