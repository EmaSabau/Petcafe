package com.example.demo.exporter;

import com.example.demo.model.Animal;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Marshaller;
import org.springframework.stereotype.Component;

import java.io.StringWriter;
import java.rmi.server.ExportException;

@Component
public class AnimalXmlExport implements ExportStrategy<Animal> {
    @Override
    public String export(Animal animal) throws ExportException {
        try {
            JAXBContext context = JAXBContext.newInstance(Animal.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            StringWriter writer = new StringWriter();
            marshaller.marshal(animal, writer);
            return writer.toString();
        } catch (Exception e) {
            throw new ExportException("Failed to export animal", e);
        }
    }

    @Override
    public String getFileName(Animal animal) {
        return "animal_" + animal.getId() + "_approved.xml";
    }
}