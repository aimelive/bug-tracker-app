export default interface Bug {
  id: string;
  title: string;
  description: string;
  resolved: boolean;
  creatorId: string;
  createdAt: Date;
  resolvedAt: Date;
}
