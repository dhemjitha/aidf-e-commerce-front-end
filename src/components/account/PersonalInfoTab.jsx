import { Card, CardContent } from "@/components/ui/card";

const PersonalInfoTab = ({ user }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Name: {user?.fullName}</p>
            <p className="text-muted-foreground">Email: {user?.emailAddresses[0].emailAddress}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoTab; 