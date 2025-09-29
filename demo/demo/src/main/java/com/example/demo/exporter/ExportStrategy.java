package com.example.demo.exporter;

import java.rmi.server.ExportException;

public interface ExportStrategy<T> {
    String export(T data) throws ExportException;
    String getFileName(T data);
}