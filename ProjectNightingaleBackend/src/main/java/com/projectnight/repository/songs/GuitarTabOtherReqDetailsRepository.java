package com.projectnight.repository.songs;

import com.projectnight.entity.songs.GuitarTabOtherReqDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface GuitarTabOtherReqDetailsRepository extends JpaRepository<GuitarTabOtherReqDetails, UUID> {
    @Query("FROM GuitarTabOtherReqDetails WHERE songTab.id  = :id")
    GuitarTabOtherReqDetails findGuitarTabOtherReqDetailsByTabId(@Param("id") UUID id);
}
