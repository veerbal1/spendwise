import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SimpleCard({ title, content }: { title: string; content: string }) {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className='max-h-8'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
      </CardContent>
    </Card>
  );
}

export default SimpleCard;
