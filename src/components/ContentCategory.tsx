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
    <div className="card w-72 bg-base-100 shadow-xl" key={id}>
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{movieCount}</button>
        </div>
      </div>
    </div>
  )
}
