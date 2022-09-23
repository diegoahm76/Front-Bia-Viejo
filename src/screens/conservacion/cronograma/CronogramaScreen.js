import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { localizer } from "../../../helpers/calendarLocalizer";
import { getMessagesES } from "../../../helpers/getMessages";
import CalendarEvent from "../../../components/CalendarEvent";

const events = [
  {
    title: "Prueba Evento",
    notes: "Comprar la cena",
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      id: "123",
      name: "Jesus Cruz",
    },
  },
  {
    title: "Prueba Evento",
    notes: "Comprar la cena",
    start: new Date(),
    end: addHours(new Date(), 4),
    user: {
      id: "1234",
      name: "Juan David",
    },
  },
];

const CronogramaScreen = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "var(--bs-primary)",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <>
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        //className="h-100"
        style={{
          height: "100vh",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  );
};
export default CronogramaScreen;
