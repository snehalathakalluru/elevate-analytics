import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Array "mo:core/Array";

actor {
  // Initialize the access control system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Marketing website functionality

  type Submission = {
    name : Text;
    email : Text;
    message : Text;
  };

  var newsletterEmails : [Text] = [];
  var contactFormSubmissions : [Submission] = [];

  // Public submission endpoints (no auth required)
  public shared ({ caller }) func signupNewsletter(email : Text) : async () {
    newsletterEmails := newsletterEmails.concat([email]);
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      message;
    };
    contactFormSubmissions := contactFormSubmissions.concat([submission]);
  };

  // Admin-only read endpoints
  public query ({ caller }) func getNewsletterEmails() : async [Text] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access this data");
    };
    newsletterEmails;
  };

  public query ({ caller }) func getContactFormSubmissions() : async [Submission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access this data");
    };
    contactFormSubmissions;
  };
};
