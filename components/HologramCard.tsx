import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export function HologramCard() {
    return (
        <Card className="bg-[url('/flux.svg')] bg-cover bg-center w-[350px]">
            <CardHeader>
                <CardTitle className="text-white">Instant Setup</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-medium text-white">
                Your job board is created automatically as soon as you sign up.
                </p>
            </CardContent>
        </Card>
    )
}