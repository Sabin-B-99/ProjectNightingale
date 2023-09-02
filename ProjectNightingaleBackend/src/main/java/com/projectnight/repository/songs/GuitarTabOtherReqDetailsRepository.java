package com.projectnight.repository.songs;

import com.projectnight.entity.songs.GuitarTabOtherReqDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GuitarTabOtherReqDetailsRepository extends JpaRepository<GuitarTabOtherReqDetails, UUID> {
}
