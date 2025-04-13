import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const PersonalInfoTab = ({ user }) => {
  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        <p className="text-gray-500">Manage your personal information and account settings</p>
      </div>

      <Card className="overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 h-32 w-full relative"></div>

        <CardContent className="p-0">
          <div className="relative px-6 pb-6">
            <Avatar className="h-24 w-24 absolute -top-12 border-4 border-white shadow-md">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
              <AvatarFallback className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xl">
                {user?.fullName?.split(" ").map(name => name[0]).join("") || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="pt-16 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.fullName}</h2>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-600 font-medium">Personal Account</Badge>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600">Verified</Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600">Premium</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-2">
            <div className="p-6 space-y-5">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Account Details</h3>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="bg-indigo-100 p-2.5 rounded-full flex-shrink-0">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{user?.fullName || "Not provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="bg-violet-100 p-2.5 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 text-violet-600" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.emailAddresses?.[0]?.emailAddress || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoTab; 