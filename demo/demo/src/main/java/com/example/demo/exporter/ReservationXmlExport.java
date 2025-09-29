package com.example.demo.exporter;

import com.example.demo.model.Reservation;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;
import org.springframework.stereotype.Component;

import java.io.StringWriter;
import java.rmi.server.ExportException;

@Component
public class ReservationXmlExport implements ExportStrategy<Reservation> {
    @Override
    public String export(Reservation request) throws ExportException {
        try {
            JAXBContext context = JAXBContext.newInstance(Reservation.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter writer = new StringWriter();
            marshaller.marshal(request, writer);
            return writer.toString();
        } catch (Exception e) {
            throw new ExportException("Failed to export reservation", e);
        }
    }

    @Override
    public String getFileName(Reservation request) {
        return "reservation_" + request.getId() + ".xml";
    }
}