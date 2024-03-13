import { Movies } from "@/interfaces/Movies"

interface IContentDetail {
  selectedMovie?: Movies | null
}
export const ContentDetails: React.FC<IContentDetail> = ({ selectedMovie }) => {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedMovie?.title}</h3>
          <p className="py-4">{selectedMovie?.description}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
