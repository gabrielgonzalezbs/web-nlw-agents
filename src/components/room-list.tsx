import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatDateTime } from "@/utils/format-relative-date";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
    const { data, isLoading } = useRooms();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">

                {isLoading && <p>Carregando...</p>}

                {data?.map(room => {
                    return (
                        <Link 
                            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                            key={room.id} 
                            to={`/room/${room.id}`}
                        >
                            <div className="flex-1">
                                <h3 className="font-medium">
                                    {room.name}
                                </h3>

                                <div className="flex items-center gap-2">
                                    <Badge className="text-xs" variant="secondary">
                                        {formatDateTime(room.createdAt)}
                                    </Badge>
                                    <Badge className="text-xs" variant="secondary">
                                        {room.questionsCount} pergunta(s)
                                    </Badge>
                                </div>
                            </div>

                            <span className="flex items-center gap-1 text-sm">
                                Entrar 
                                <ArrowRight className="size-3" />
                            </span>
                        </Link>
                    )
                })}
                
            </CardContent>
        </Card>
    )
}