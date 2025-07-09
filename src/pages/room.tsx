import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string
}

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.id) {
    return <Navigate replace to="/" />
  }

  return (
    <div>
      <h1>Room</h1>
      <p>This is the room page.</p>
    </div>
  );
}