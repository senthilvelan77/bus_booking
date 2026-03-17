import { supabase } from "../supabaseClient";

const BookTicket = () => {

  const handleBooking = async () => {
    // 1️⃣ Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    // 2️⃣ INSERT booking (THIS IS THE PART YOU ASKED)
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          bus_id: selectedBusId,
          seat_no: 1,
          travel_date: "2026-02-20",
        },
      ])
      .select(); // 👈 ADD THIS LINE

    // 3️⃣ Debug
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
    } else {
      alert("Booking successful!");
    }
  };

  return (
    <button onClick={handleBooking}>
      Book Ticket
    </button>
  );
};

export default BookTicket;
